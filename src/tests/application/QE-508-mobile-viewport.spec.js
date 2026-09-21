const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Mobile Viewport Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-508] Verify BOOK YOUR VACATION button is visible and clickable on mobile viewport', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Set browser viewport to mobile dimensions
    await alaskaPage.setViewportSize(TD.viewports.mobile.width, TD.viewports.mobile.height);

    // Step 2: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 3: Verify hero banner is displayed properly on mobile
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    // Step 4: Verify BOOK YOUR VACATION button is visible on mobile
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);

    // Step 5: Verify button is clickable on mobile
    await alaskaPage.clickBookYourVacationButton();

    // Step 6: Verify navigation occurs
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toMatch(TD.urlPatterns.searchResults);
  });
});