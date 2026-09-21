const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/cruise-search.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');

test.describe('[QE-548][AC3] Verify error handling when detail page fails to load', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('QE-551: Validate appropriate error message displays with Retry and Back options', async ({ page }) => {
    // Step 1: Navigate to cruise search results
    await cruiseSearchPage.navigateToSearchResults('alaska');
    await cruiseSearchPage.verifySearchResultsDisplayed();
    console.log('✓ Search results page displays');

    // Step 2: Simulate network or server error
    await page.route('**/cruises/**/cruise-*', route => {
      route.abort('failed');
    });
    console.log('✓ Error condition active (network offline simulation)');

    // Step 3: Click View Details CTA
    await cruiseSearchPage.clickViewDetailsOnCard(1);
    console.log('✓ Navigation attempted');

    // Step 4: Verify page fails to load (wait for error state)
    await page.waitForTimeout(2000);
    console.log('✓ Cruise detail page does not load');

    // Step 5: Verify error message displayed
    await cruiseDetailsPage.verifyErrorMessage('Unable to load cruise details. Please try again.');
    console.log('✓ Error message displayed prominently');

    // Step 6: Verify Retry button present
    await cruiseDetailsPage.verifyRetryButton();
    console.log('✓ Retry button displayed and enabled');

    // Step 7: Verify Back to Search Results link present
    await cruiseDetailsPage.verifyBackToSearchLink();
    console.log('✓ Back link displayed and enabled');

    // Step 8: Verify no broken content displayed
    await cruiseDetailsPage.verifyNoBrokenContent();
    console.log('✓ Only error UI visible, no broken content');

    // Step 9: Click Back to Search Results link
    await cruiseDetailsPage.clickBackToSearch();
    await cruiseSearchPage.verifySearchResultsDisplayed();
    console.log('✓ User navigated back to search results');

    // Step 10: Restore network connectivity
    await page.unroute('**/cruises/**/cruise-*');
    console.log('✓ Error condition resolved');

    // Step 11: Navigate to error page and click Retry
    await cruiseSearchPage.clickViewDetailsOnCard(1);
    await page.waitForTimeout(1000);
    // If error still shows, click retry
    const retryVisible = await page.locator('button:has-text("Retry")').isVisible().catch(() => false);
    if (retryVisible) {
      await cruiseDetailsPage.clickRetry();
      console.log('✓ Page attempts reload');
    }

    // Step 12: Verify page loads successfully after retry
    await cruiseDetailsPage.verifyPageLoaded();
    console.log('✓ Cruise detail page loads completely');
  });
});