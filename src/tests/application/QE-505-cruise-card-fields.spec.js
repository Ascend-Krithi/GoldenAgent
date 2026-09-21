const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] Cruise Card Required Fields Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-505] Verify each cruise card displays Cruise Itinerary Title, Duration, Starting Price, and CTA button', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Locate the first cruise card in the results grid
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    expect(hasCruiseCards).toBe(true);

    // Step 4: Verify Cruise Itinerary Title is displayed on the card
    const isTitleVisible = await alaskaPage.isFirstCruiseCardTitleVisible();
    expect(isTitleVisible).toBe(true);

    // Step 5: Verify Duration information is displayed on the card
    const isDurationVisible = await alaskaPage.isFirstCruiseCardDurationVisible();
    expect(isDurationVisible).toBe(true);

    // Step 6: Verify Starting Price is displayed on the card
    const isPriceVisible = await alaskaPage.isFirstCruiseCardPriceVisible();
    expect(isPriceVisible).toBe(true);

    // Step 7: Verify CTA button is displayed on the card
    const isCTAVisible = await alaskaPage.isCruiseDetailsButtonVisible();
    expect(isCTAVisible).toBe(true);
  });
});