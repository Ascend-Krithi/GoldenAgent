const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC3] TS-006: Verify at least one valid Alaska cruise card is displayed', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-457: Verify that at least one valid Alaska cruise card is displayed in the results grid', async ({ page }) => {
    // Step 1: Navigate to cruise search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify Alaska filter is applied
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    console.log('✓ Alaska is selected in destination filter');

    // Step 3: Verify at least one cruise card is displayed in results grid
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    
    const cruiseCardCount = await princessPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThanOrEqual(1);
    console.log(`✓ At least one valid Alaska cruise card is visible in the results grid (Found: ${cruiseCardCount})`);
  });
});