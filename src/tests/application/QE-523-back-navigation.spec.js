const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC2] Back Navigation Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-523] Verify back navigation from search results page returns user to Alaska landing page', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Dismiss cookie consent banner if present
    const isCookieBannerVisible = await alaskaPage.isCookieBannerVisible();
    if (isCookieBannerVisible) {
      await alaskaPage.dismissCookieBanner();
    }

    // Step 3: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();

    // Step 4: Verify user is on search results page
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const searchURL = await alaskaPage.getCurrentURL();
    expect(searchURL).toMatch(TD.urlPatterns.searchResults);

    // Step 5: Click browser back button
    await page.goBack();

    // Step 6: Verify user is returned to Alaska landing page
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 7: Verify page content is fully loaded and functional
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();

    expect(isHeroBannerVisible).toBe(true);
    expect(isButtonVisible).toBe(true);
  });
});