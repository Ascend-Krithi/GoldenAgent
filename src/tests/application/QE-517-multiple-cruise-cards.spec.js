const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] Multiple Cruise Cards Display Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-517] Verify cruise card display when maximum number of Alaska cruises are available', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Verify multiple cruise cards are displayed
    const cardCount = await alaskaPage.getCruiseCardCount();
    expect(cardCount).toBeGreaterThan(0);

    // Step 4: Verify all displayed cruise cards contain required fields
    const isTitleVisible = await alaskaPage.isFirstCruiseCardTitleVisible();
    const isDurationVisible = await alaskaPage.isFirstCruiseCardDurationVisible();
    const isPriceVisible = await alaskaPage.isFirstCruiseCardPriceVisible();
    const isCTAVisible = await alaskaPage.isCruiseDetailsButtonVisible();

    expect(isTitleVisible).toBe(true);
    expect(isDurationVisible).toBe(true);
    expect(isPriceVisible).toBe(true);
    expect(isCTAVisible).toBe(true);

    // Step 5: Verify pagination controls if multiple pages exist
    if (cardCount >= 10) {
      const hasPagination = await alaskaPage.isPaginationVisible();
      if (hasPagination) {
        // Step 6: Verify results count
        const resultsText = await alaskaPage.getResultsCountText();
        expect(resultsText).toBeTruthy();

        // Step 7: Click next page in pagination
        await alaskaPage.clickNextPage();
        await page.waitForTimeout(2000);

        // Step 8: Verify additional cruise cards are displayed on page 2
        const newCardCount = await alaskaPage.getCruiseCardCount();
        expect(newCardCount).toBeGreaterThan(0);
      }
    }
  });
});