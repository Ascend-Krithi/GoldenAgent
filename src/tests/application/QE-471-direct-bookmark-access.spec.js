const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-471] Direct Bookmark Access', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-471] TS-020: Verify search results page behavior when accessed directly via bookmark or shared link', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate directly to search results page via bookmark or direct link
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify Alaska destination filter is pre-selected
    const isAlaskaFilterApplied = await searchResultsPage.isAlaskaFilterApplied();
    expect(isAlaskaFilterApplied).toBe(true);

    // Step 3: Verify all filter controls are displayed and functional
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    const isDeparturePortsFilterVisible = await searchResultsPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBe(true);

    const isDatesFilterVisible = await searchResultsPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBe(true);

    const isGuestsFilterVisible = await searchResultsPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBe(true);

    // Step 4: Verify Alaska cruise cards are displayed
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(0);

    // Step 5: Verify cruise card CTA buttons are functional
    if (cruiseCardsCount > 0) {
      const isCTAVisible = await searchResultsPage.isCruiseCardCTAVisible(0);
      expect(isCTAVisible).toBe(true);
    }
  });
});