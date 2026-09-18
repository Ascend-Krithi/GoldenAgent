const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-453] Cookie Consent Banner Dismissible', {
  tag: ['@smoke', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;

  test('[QE-453] TS-002: Verify that cookie consent banner is dismissible and does not obstruct the BOOK YOUR VACATION button', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);

    // Step 2: Verify cookie consent banner is displayed
    const isCookieBannerVisible = await alaskaPage.isCookieConsentBannerVisible();
    if (isCookieBannerVisible) {
      // Step 3: Click on 'I Acknowledge' button to dismiss cookie consent
      await alaskaPage.acceptCookieConsent();

      // Verify cookie consent banner is dismissed
      const isBannerStillVisible = await alaskaPage.isCookieConsentBannerVisible();
      expect(isBannerStillVisible).toBe(false);
    }

    // Step 4: Verify 'BOOK YOUR VACATION' button is accessible and not obstructed
    const isBookButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBe(true);
  });
});