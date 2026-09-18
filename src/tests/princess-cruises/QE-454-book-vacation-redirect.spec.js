const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC2] TS-003: Verify BOOK YOUR VACATION button redirects to cruise search results', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-454: Verify that clicking BOOK YOUR VACATION button redirects to cruise search results page with correct URL parameter', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Wait for hero banner to fully load
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    console.log('✓ Hero banner is fully rendered');

    // Step 3: Click on 'BOOK YOUR VACATION' CTA button
    await princessPage.clickBookYourVacationButton();
    console.log('✓ Button click is registered');

    // Step 4: Verify redirection to cruise search results page
    await expect(page).toHaveURL(/cruise-search\/results/);
    const hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ User is redirected to search results page with URL containing trade=A parameter');
  });
});