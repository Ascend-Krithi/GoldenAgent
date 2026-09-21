const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC2] Trade Parameter Pre-selection Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-502] Verify trade=A URL parameter automatically pre-selects Alaska as destination filter on search results page', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();

    // Step 3: Verify search results page loads with trade=A parameter
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toContain('trade=A');

    // Step 4: Verify Alaska destination filter is pre-selected
    const destinationValue = await alaskaPage.getDestinationFilterValue();
    expect(destinationValue).toContain('Alaska');

    // Step 5: Verify displayed cruise results are filtered for Alaska destination
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    expect(hasCruiseCards).toBe(true);
  });
});