const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC2] Missing Trade Parameter Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-515] Verify search results page behavior when trade parameter is missing or invalid', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to search results URL without trade parameter
    await alaskaPage.gotoSearchResults();

    // Step 2: Verify page loads without errors
    await expect(page).toHaveURL(TD.urls.searchResults);

    // Step 3: Verify destination filter state
    const isDestinationVisible = await alaskaPage.isDestinationFilterVisible();
    expect(isDestinationVisible).toBe(true);

    // Step 4: Verify cruise cards are displayed
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    const hasNoResults = await alaskaPage.isNoResultsMessageVisible();
    expect(hasCruiseCards || hasNoResults).toBe(true);

    // Step 5: Navigate to search results URL with invalid trade parameter
    await alaskaPage.gotoSearchResultsWithTrade(TD.parameters.tradeInvalid);

    // Step 6: Verify handling of invalid trade parameter
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toContain(TD.parameters.tradeInvalid);

    const isFilterVisible = await alaskaPage.isDestinationFilterVisible();
    expect(isFilterVisible).toBe(true);
  });
});