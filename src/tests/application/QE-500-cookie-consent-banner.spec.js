const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Cookie Consent Banner Tests', { tag: ['@smoke', '@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-500] Verify cookie consent banner is dismissible and does not obstruct the BOOK YOUR VACATION button', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Verify cookie consent banner is displayed
    const isCookieBannerVisible = await alaskaPage.isCookieBannerVisible();
    expect(isCookieBannerVisible).toBe(true);

    // Step 3: Verify BOOK YOUR VACATION button visibility with cookie banner present
    const isButtonVisibleWithBanner = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisibleWithBanner).toBe(true);

    // Step 4: Click the accept button on cookie consent banner
    await alaskaPage.dismissCookieBanner();

    // Verify banner is dismissed
    const isBannerStillVisible = await alaskaPage.isCookieBannerVisible();
    expect(isBannerStillVisible).toBe(false);

    // Step 5: Verify BOOK YOUR VACATION button is fully accessible after dismissing banner
    const isButtonFullyAccessible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonFullyAccessible).toBe(true);
  });
});