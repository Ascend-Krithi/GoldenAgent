const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] Minimal Card Data Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-520] Verify search results page behavior when cruise card data contains minimum required fields only', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Identify cruise card with minimal data
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    expect(hasCruiseCards).toBe(true);

    // Step 4: Verify Itinerary Title is displayed
    const isTitleVisible = await alaskaPage.isFirstCruiseCardTitleVisible();
    expect(isTitleVisible).toBe(true);

    // Step 5: Verify Duration is displayed
    const isDurationVisible = await alaskaPage.isFirstCruiseCardDurationVisible();
    expect(isDurationVisible).toBe(true);

    // Step 6: Verify Starting Price is displayed
    const isPriceVisible = await alaskaPage.isFirstCruiseCardPriceVisible();
    expect(isPriceVisible).toBe(true);

    // Step 7: Verify CTA button is displayed
    const isCTAVisible = await alaskaPage.isCruiseDetailsButtonVisible();
    expect(isCTAVisible).toBe(true);
  });
});