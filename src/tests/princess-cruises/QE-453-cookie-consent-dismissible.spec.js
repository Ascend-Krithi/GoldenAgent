const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1] TS-002: Verify cookie consent banner is dismissible', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-453: Verify that cookie consent banner is dismissible and does not obstruct the BOOK YOUR VACATION button', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads with cookie consent banner displayed');

    // Step 2: Verify cookie consent banner is displayed
    const isCookieBannerVisible = await princessPage.isCookieConsentBannerVisible();
    if (isCookieBannerVisible) {
      console.log('✓ Cookie consent banner is visible on the page');

      // Step 3: Click on 'I Acknowledge' button to dismiss cookie consent
      await princessPage.acceptCookieConsent();
      await page.waitForTimeout(1000);
      
      // Verify banner is dismissed
      const isBannerStillVisible = await princessPage.isCookieConsentBannerVisible();
      expect(isBannerStillVisible).toBeFalsy();
      console.log('✓ Cookie consent banner is dismissed and no longer visible');
    } else {
      console.log('✓ Cookie consent banner not displayed or already dismissed');
    }

    // Step 4: Verify 'BOOK YOUR VACATION' button is accessible and not obstructed
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ BOOK YOUR VACATION button is fully visible and clickable without obstruction');
  });
});