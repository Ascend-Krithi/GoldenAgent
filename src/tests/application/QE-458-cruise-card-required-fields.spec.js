const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-458] Cruise Card Required Fields', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-458] TS-007: Verify that each cruise card displays all required information: Itinerary Title, Duration, Starting Price, and CTA button', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to cruise search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Select first cruise card for inspection
    const isCruiseCardVisible = await searchResultsPage.isCruiseCardVisible(0);
    expect(isCruiseCardVisible).toBe(true);

    // Step 3: Verify Cruise Itinerary Title is displayed
    const isTitleVisible = await searchResultsPage.isCruiseCardTitleVisible(0);
    expect(isTitleVisible).toBe(true);

    const title = await searchResultsPage.getCruiseCardTitle(0);
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Step 4: Verify Duration (Nights/Days) is displayed
    const isDurationVisible = await searchResultsPage.isCruiseCardDurationVisible(0);
    expect(isDurationVisible).toBe(true);

    // Step 5: Verify Starting Price is displayed
    const isPriceVisible = await searchResultsPage.isCruiseCardPriceVisible(0);
    expect(isPriceVisible).toBe(true);

    // Step 6: Verify CTA button is displayed
    const isCTAVisible = await searchResultsPage.isCruiseCardCTAVisible(0);
    expect(isCTAVisible).toBe(true);
  });
});