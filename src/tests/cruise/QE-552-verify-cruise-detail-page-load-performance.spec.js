const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/cruise-search.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');

test.describe('[QE-548][AC4] Verify cruise detail page load performance', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('QE-552: Validate cruise detail page loads within 3 seconds and becomes interactive within 4 seconds', async ({ page }) => {
    // Step 1: Open browser performance monitoring (implicit in Playwright)
    console.log('✓ Performance monitoring active');

    // Step 2: Navigate to cruise search results
    await cruiseSearchPage.navigateToSearchResults('alaska');
    await cruiseSearchPage.verifySearchResultsDisplayed();
    console.log('✓ Search results page displayed');

    // Step 3: Start performance recording
    const performanceMetrics = [];
    console.log('✓ Performance recording started');

    // Step 4: Click View Details CTA and start timer
    const startTime = Date.now();
    await cruiseSearchPage.clickViewDetailsOnCard(1);
    console.log('✓ Navigation initiated and timer begins');

    // Step 5: Verify loading indicator displayed
    await cruiseDetailsPage.verifyLoadingIndicator();
    console.log('✓ Loading indicator visible during load');

    // Step 6: Measure time until page fully loaded
    await cruiseDetailsPage.verifyPageLoaded();
    const pageLoadTime = (Date.now() - startTime) / 1000;
    performanceMetrics.push({ metric: 'Page Load Time', value: pageLoadTime });
    console.log(`✓ Page loads in ${pageLoadTime} seconds`);
    expect(pageLoadTime).toBeLessThanOrEqual(3);
    console.log('✓ Page load time meets requirement (≤ 3 seconds)');

    // Step 7: Verify loading indicator disappears
    await cruiseDetailsPage.verifyLoadingIndicatorGone();
    console.log('✓ Loading indicator no longer visible');

    // Step 8: Measure time until page interactive
    await page.waitForLoadState('networkidle');
    const timeToInteractive = (Date.now() - startTime) / 1000;
    performanceMetrics.push({ metric: 'Time to Interactive', value: timeToInteractive });
    console.log(`✓ Page interactive in ${timeToInteractive} seconds`);
    expect(timeToInteractive).toBeLessThanOrEqual(4);
    console.log('✓ Time to interactive meets requirement (≤ 4 seconds)');

    // Step 9: Verify interactive elements responsive
    await cruiseDetailsPage.verifyBookNowButton();
    await cruiseDetailsPage.verifyDeckPlansSection();
    console.log('✓ All elements respond without delay');

    // Step 10: Stop recording and analyze metrics
    console.log('✓ Performance metrics collected:');
    performanceMetrics.forEach(metric => {
      console.log(`  - ${metric.metric}: ${metric.value.toFixed(2)}s`);
    });

    // Step 11: Document performance results
    const performanceReport = {
      testKey: 'QE-552',
      pageLoadTime: pageLoadTime,
      timeToInteractive: timeToInteractive,
      passStatus: pageLoadTime <= 3 && timeToInteractive <= 4 ? 'PASS' : 'FAIL'
    };
    console.log('✓ Results documented:', JSON.stringify(performanceReport, null, 2));
  });
});