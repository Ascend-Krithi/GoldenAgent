const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-457] Alaska Cruise Card Displayed', {
  tag: ['@smoke', '@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-457] TS-006: Verify that at least one valid Alaska cruise card is displayed in the results grid', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to cruise search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify Alaska filter is applied
    const isAlaskaFilterApplied = await searchResultsPage.isAlaskaFilterApplied();
    expect(isAlaskaFilterApplied).toBe(true);

    // Step 3: Verify at least one cruise card is displayed in results grid
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(1);
  });
});