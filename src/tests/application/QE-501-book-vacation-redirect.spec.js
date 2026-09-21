const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC2] BOOK YOUR VACATION Button Redirect Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-501] Verify clicking BOOK YOUR VACATION button redirects to cruise search results page with trade=A parameter', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Locate and verify BOOK YOUR VACATION button is clickable
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);

    // Step 3: Click on BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();

    // Step 4: Verify redirection to cruise search results page
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 5: Verify URL contains trade=A parameter
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toContain('trade=A');
    expect(currentURL).toMatch(/\/cruise-search\/results\//);
  });
});