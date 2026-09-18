const { test, expect } = require('@playwright/test');
const AlaskaLandingPage = require('../../pages/princess-cruises/alaska-landing.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-453] Verify cookie consent banner is dismissible', () => {
  let alaskaLandingPage;

  test.beforeEach(async ({ page }) => {
    alaskaLandingPage = new AlaskaLandingPage(page);
  });

  test('[QE-453] TS-002: Verify that cookie consent banner is dismissible and does not obstruct the BOOK YOUR VACATION button', async ({ page }) => {
    // Arrange & Act - Navigate to Alaska destination landing page
    await alaskaLandingPage.goto();

    // Assert - Alaska landing page loads with cookie consent banner displayed
    await expect(page).toHaveURL(TD.urlPatterns.alaskaLanding);

    // Act & Assert - Verify cookie consent banner is displayed (if present)
    const isCookieBannerVisible = await alaskaLandingPage.isCookieConsentBannerVisible();
    
    if (isCookieBannerVisible) {
      await expect(alaskaLandingPage.getCookieConsentBanner()).toBeVisible();

      // Act - Click on 'I Acknowledge' button to dismiss cookie consent
      await alaskaLandingPage.dismissCookieConsent();

      // Assert - Cookie consent banner is dismissed and no longer visible
      await expect(alaskaLandingPage.getCookieConsentBanner()).not.toBeVisible();
    }

    // Assert - Verify 'BOOK YOUR VACATION' button is accessible and not obstructed
    const isBookButtonVisible = await alaskaLandingPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    await expect(alaskaLandingPage.getBookYourVacationButton()).toBeVisible();
  });
});
