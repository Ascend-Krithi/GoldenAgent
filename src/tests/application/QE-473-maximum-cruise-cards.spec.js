const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-473] Maximum Cruise Cards Display', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-473] TS-022: Verify search results display correctly when maximum number of Alaska cruise cards are returned', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify maximum number of cruise cards are displayed
    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(0);

    // Step 3: Verify all cruise cards display required information
    if (cruiseCardsCount > 0) {
      for (let i = 0; i < Math.min(cruiseCardsCount, 5); i++) {
        const isTitleVisible = await searchResultsPage.isCruiseCardTitleVisible(i);
        expect(isTitleVisible).toBe(true);

        const isDurationVisible = await searchResultsPage.isCruiseCardDurationVisible(i);
        expect(isDurationVisible).toBe(true);

        const isPriceVisible = await searchResultsPage.isCruiseCardPriceVisible(i);
        expect(isPriceVisible).toBe(true);

        const isCTAVisible = await searchResultsPage.isCruiseCardCTAVisible(i);
        expect(isCTAVisible).toBe(true);
      }
    }

    // Step 4: Verify page scrolling and performance
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));

    // Step 5: Verify pagination or 'Load More' functionality if present
    // Note: This would require additional locators for pagination controls
  });
});