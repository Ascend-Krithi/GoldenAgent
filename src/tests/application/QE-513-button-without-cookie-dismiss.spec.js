const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Button Functionality with Cookie Banner Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-513] Verify BOOK YOUR VACATION button functionality when cookie consent is not dismissed', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Verify cookie consent banner is displayed
    const isCookieBannerVisible = await alaskaPage.isCookieBannerVisible();
    expect(isCookieBannerVisible).toBe(true);

    // Step 3: Verify BOOK YOUR VACATION button visibility with cookie banner present
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);

    // Step 4: Attempt to click BOOK YOUR VACATION button without dismissing cookie banner
    await alaskaPage.clickBookYourVacationButton();

    // Step 5: Verify navigation to search results page occurs
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toMatch(TD.urlPatterns.searchResults);
  });
});