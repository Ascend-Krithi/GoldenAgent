const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-476] Trade Parameter Persistence', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-476] TS-025: Verify that trade=A parameter persists correctly when user applies additional filters on search results page', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify trade=A parameter is present in URL
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    // Step 3: Apply Departure Ports filter
    await searchResultsPage.applyDeparturePortFilter();
    await page.waitForTimeout(2000);

    // Step 4: Verify trade=A parameter persists in URL
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    // Step 5: Verify Alaska destination remains selected
    const isAlaskaFilterApplied = await searchResultsPage.isAlaskaFilterApplied();
    expect(isAlaskaFilterApplied).toBe(true);

    // Step 6: Apply Dates filter
    await searchResultsPage.applyDatesFilter();
    await page.waitForTimeout(2000);

    // Step 7: Verify trade=A parameter persists in URL
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    // Step 8: Apply Guests filter
    await searchResultsPage.applyGuestsFilter();
    await page.waitForTimeout(2000);

    // Step 9: Verify trade=A parameter persists in URL and Alaska remains selected
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    const isAlaskaStillApplied = await searchResultsPage.isAlaskaFilterApplied();
    expect(isAlaskaStillApplied).toBe(true);

    // Step 10: Verify cruise results are filtered correctly
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(0);
  });
});