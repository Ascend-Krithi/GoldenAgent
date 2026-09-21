const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Tablet Viewport Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-518] Verify BOOK YOUR VACATION button behavior on tablet viewport (768x1024)', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Set browser viewport to tablet dimensions
    await alaskaPage.setViewportSize(TD.viewports.tablet.width, TD.viewports.tablet.height);

    // Step 2: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 3: Verify hero banner is displayed properly on tablet
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    // Step 4: Verify BOOK YOUR VACATION button is visible on tablet
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);

    // Step 5: Verify button is clickable on tablet
    await alaskaPage.clickBookYourVacationButton();

    // Step 6: Verify navigation occurs
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toMatch(TD.urlPatterns.searchResults);
  });
});