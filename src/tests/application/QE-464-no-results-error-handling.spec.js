const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-464] No Results Error Handling', {
  tag: ['@negative', '@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-464] TS-013: Verify error handling when no Alaska cruise results are available', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify no cruise cards are displayed or appropriate message shown
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    
    if (cruiseCardsCount === 0) {
      // Step 3: Verify appropriate 'no results' message is displayed
      const isNoResultsVisible = await searchResultsPage.isNoResultsMessageVisible();
      expect(isNoResultsVisible).toBe(true);
    }

    // Step 4: Verify filter controls remain functional
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    const isDeparturePortsFilterVisible = await searchResultsPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBe(true);

    const isDatesFilterVisible = await searchResultsPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBe(true);

    const isGuestsFilterVisible = await searchResultsPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBe(true);
  });
});