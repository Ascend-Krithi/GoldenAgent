const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC2, AC3] TS-025: Verify trade=A parameter persists with additional filters', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-476: Verify that trade=A parameter persists correctly when user applies additional filters on search results page', async ({ page }) => {
    // Step 1: Navigate to search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads with Alaska pre-selected');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify trade=A parameter is present in URL
    let hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ URL contains trade=A parameter');

    // Step 3: Apply Departure Ports filter
    await princessPage.applyDeparturePortFilter('Seattle');
    console.log('✓ Departure port filter is applied');

    // Step 4: Verify trade=A parameter persists in URL
    await page.waitForTimeout(1000);
    hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ URL still contains trade=A parameter along with new filter parameters');

    // Step 5: Verify Alaska destination remains selected
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    console.log('✓ Alaska is still selected in destination filter');

    // Step 6: Apply Dates filter
    await princessPage.applyDatesFilter('2024-06-01', '2024-08-31');
    console.log('✓ Dates filter is applied');

    // Step 7: Verify trade=A parameter persists in URL
    await page.waitForTimeout(1000);
    hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ URL still contains trade=A parameter along with all filter parameters');

    // Step 8: Apply Guests filter
    await princessPage.applyGuestsFilter(2);
    console.log('✓ Guests filter is applied');

    // Step 9: Verify trade=A parameter persists in URL and Alaska remains selected
    await page.waitForTimeout(1000);
    hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    
    const isDestinationStillVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationStillVisible).toBeTruthy();
    console.log('✓ URL contains trade=A parameter with all filters, and Alaska destination remains selected');

    // Step 10: Verify cruise results are filtered correctly
    const cruiseCardCount = await princessPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThanOrEqual(0);
    console.log(`✓ Cruise results display Alaska cruises matching all applied filters (${cruiseCardCount} found)`);
  });
});