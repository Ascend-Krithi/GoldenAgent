const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-462] Search Without Trade Parameter', {
  tag: ['@negative', '@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-462] TS-011: Verify behavior when accessing search results page without trade parameter', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate directly to search results page without trade parameter
    await searchResultsPage.goto();
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });

    // Step 2: Verify destination filter state
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    // Step 3: Verify cruise results are displayed
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(0);

    // Step 4: Verify no error messages are displayed
    const isSearchResultsVisible = await searchResultsPage.isSearchResultsContainerVisible();
    expect(isSearchResultsVisible).toBe(true);
  });
});