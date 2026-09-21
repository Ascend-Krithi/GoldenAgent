const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] Cruise Card Display Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-504] Verify at least one valid Alaska cruise card is displayed in the results grid', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();

    // Step 3: Verify search results page loads successfully
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toContain('trade=A');

    // Step 4: Verify results grid container is present
    const isResultsGridVisible = await alaskaPage.isResultsGridVisible();
    expect(isResultsGridVisible).toBe(true);

    // Step 5: Verify at least one cruise card is displayed in the results grid
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    expect(hasCruiseCards).toBe(true);

    // Step 6: Verify the cruise card contains valid Alaska cruise data
    const cardTitle = await alaskaPage.getFirstCruiseCardTitle();
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.length).toBeGreaterThan(0);
  });
});