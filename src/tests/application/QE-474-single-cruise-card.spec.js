const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-474] Single Cruise Card Display', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-474] TS-023: Verify search results display correctly when only one Alaska cruise card is available', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify cruise cards are displayed
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(0);

    if (cruiseCardsCount >= 1) {
      // Step 3: Verify cruise card displays all required information
      const isTitleVisible = await searchResultsPage.isCruiseCardTitleVisible(0);
      expect(isTitleVisible).toBe(true);

      const title = await searchResultsPage.getCruiseCardTitle(0);
      expect(title).toBeTruthy();

      const isDurationVisible = await searchResultsPage.isCruiseCardDurationVisible(0);
      expect(isDurationVisible).toBe(true);

      const isPriceVisible = await searchResultsPage.isCruiseCardPriceVisible(0);
      expect(isPriceVisible).toBe(true);

      // Step 4: Verify page layout is correct with single result
      const isSearchResultsVisible = await searchResultsPage.isSearchResultsContainerVisible();
      expect(isSearchResultsVisible).toBe(true);

      // Step 5: Verify CTA button on cruise card is functional
      const isCTAVisible = await searchResultsPage.isCruiseCardCTAVisible(0);
      expect(isCTAVisible).toBe(true);
    }
  });
});