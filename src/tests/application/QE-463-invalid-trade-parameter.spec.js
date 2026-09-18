const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-463] Invalid Trade Parameter', {
  tag: ['@negative', '@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-463] TS-012: Verify behavior when accessing search results page with invalid trade parameter value', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to search results page with invalid trade parameter
    await searchResultsPage.goto('INVALID');
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });

    // Step 2: Verify system response to invalid parameter
    const isSearchResultsVisible = await searchResultsPage.isSearchResultsContainerVisible();
    expect(isSearchResultsVisible).toBe(true);

    // Step 3: Verify destination filter state
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    // Step 4: Verify page functionality is not broken
    const isDeparturePortsFilterVisible = await searchResultsPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBe(true);

    const isDatesFilterVisible = await searchResultsPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBe(true);

    const isGuestsFilterVisible = await searchResultsPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBe(true);
  });
});