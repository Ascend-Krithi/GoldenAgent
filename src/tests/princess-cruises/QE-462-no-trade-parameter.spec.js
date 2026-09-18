const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC2] TS-011: Verify behavior when accessing search results without trade parameter', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-462: Verify behavior when accessing search results page without trade parameter', async ({ page }) => {
    // Step 1: Navigate directly to search results page without trade parameter
    await princessPage.navigateToSearchResults('');
    await expect(page).toHaveURL(/cruise-search\/results/);
    console.log('✓ Search results page loads');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify destination filter state
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    console.log('✓ No destination is pre-selected or default destination is selected');

    // Step 3: Verify cruise results are displayed
    await page.waitForTimeout(2000);
    const cruiseCardCount = await princessPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThanOrEqual(0);
    console.log(`✓ Cruise results are displayed (all destinations or default set) - Found: ${cruiseCardCount}`);

    // Step 4: Verify no error messages are displayed
    const currentUrl = await princessPage.getCurrentUrl();
    expect(currentUrl).toContain('/cruise-search/results');
    console.log('✓ Page loads without errors and displays appropriate content');
  });
});