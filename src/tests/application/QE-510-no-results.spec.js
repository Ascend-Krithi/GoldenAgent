const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] No Results Handling Tests', { tag: ['@negative', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-510] Verify behavior when search results page returns no Alaska cruise cards', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();

    // Step 3: Verify search results page loads with trade=A parameter
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toContain('trade=A');

    // Step 4: Check if cruise cards are displayed or no results message
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    const hasNoResultsMessage = await alaskaPage.isNoResultsMessageVisible();

    // Step 5: Verify appropriate messaging
    if (!hasCruiseCards) {
      expect(hasNoResultsMessage).toBe(true);
    } else {
      expect(hasCruiseCards).toBe(true);
    }
  });
});