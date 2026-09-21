const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] Single Cruise Card Display Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-516] Verify cruise card display when only one Alaska cruise is available', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Get cruise card count
    const cardCount = await alaskaPage.getCruiseCardCount();
    expect(cardCount).toBeGreaterThanOrEqual(1);

    // Step 4: Verify the cruise card displays all required fields
    const isTitleVisible = await alaskaPage.isFirstCruiseCardTitleVisible();
    const isDurationVisible = await alaskaPage.isFirstCruiseCardDurationVisible();
    const isPriceVisible = await alaskaPage.isFirstCruiseCardPriceVisible();
    const isCTAVisible = await alaskaPage.isCruiseDetailsButtonVisible();

    expect(isTitleVisible).toBe(true);
    expect(isDurationVisible).toBe(true);
    expect(isPriceVisible).toBe(true);
    expect(isCTAVisible).toBe(true);

    // Step 5: Verify no pagination controls if single result
    if (cardCount === 1) {
      const hasPagination = await alaskaPage.isPaginationVisible();
      expect(hasPagination).toBe(false);
    }
  });
});