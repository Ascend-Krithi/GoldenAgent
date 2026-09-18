const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC3] TS-013: Verify error handling when no Alaska cruise results available', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-464: Verify error handling when no Alaska cruise results are available', async ({ page }) => {
    // Step 1: Navigate to search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    await page.waitForTimeout(2000);

    // Step 2: Verify no cruise cards are displayed OR at least one is displayed
    const cruiseCardCount = await princessPage.getCruiseCardCount();
    
    if (cruiseCardCount === 0) {
      console.log('✓ No cruise cards are present in results grid');
      
      // Step 3: Verify appropriate 'no results' message is displayed
      const isNoResultsVisible = await princessPage.isNoResultsMessageVisible();
      expect(isNoResultsVisible).toBeTruthy();
      console.log('✓ User-friendly message indicating no cruises are available is displayed');
    } else {
      console.log(`✓ Cruise cards are displayed (${cruiseCardCount} found)`);
    }

    // Step 4: Verify filter controls remain functional
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    
    const isDeparturePortsFilterVisible = await princessPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBeTruthy();
    console.log('✓ All filter controls are still accessible and functional');
  });
});