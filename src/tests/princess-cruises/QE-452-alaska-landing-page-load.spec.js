const { test, expect } = require('../../fixtures');
const AlaskaLandingPage = require('../../pages/princess-cruises/alaska-landing.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-452] Verify Alaska destination landing page loads successfully', () => {
  let alaskaLandingPage;

  test.beforeEach(async ({ page }) => {
    alaskaLandingPage = new AlaskaLandingPage(page);
  });

  test('[QE-452] TS-001: Verify that the Alaska destination landing page loads successfully with hero banner and BOOK YOUR VACATION CTA button displayed', async ({ page }) => {
    // Arrange & Act - Navigate to Alaska destination landing page
    await alaskaLandingPage.goto();

    // Assert - Alaska destination landing page loads successfully
    await expect(page).toHaveURL(TD.urlPatterns.alaskaLanding);

    // Assert - Verify hero banner is displayed on the page
    const isHeroBannerVisible = await alaskaLandingPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    await expect(alaskaLandingPage.getHeroBanner()).toBeVisible();

    // Assert - Verify 'BOOK YOUR VACATION' CTA button is displayed
    const isBookButtonVisible = await alaskaLandingPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    await expect(alaskaLandingPage.getBookYourVacationButton()).toBeVisible();
  });
});