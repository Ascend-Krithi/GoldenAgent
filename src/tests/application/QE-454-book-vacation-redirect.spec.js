const { test, expect } = require('@playwright/test');
const AlaskaLandingPage = require('../../pages/princess-cruises/alaska-landing.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-454] Verify BOOK YOUR VACATION button redirects correctly', () => {
  let alaskaLandingPage;

  test.beforeEach(async ({ page }) => {
    alaskaLandingPage = new AlaskaLandingPage(page);
  });

  test('[QE-454] TS-003: Verify that clicking BOOK YOUR VACATION button redirects to cruise search results page with correct URL parameter', async ({ page }) => {
    // Arrange - Navigate to Alaska destination landing page
    await alaskaLandingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.alaskaLanding);

    // Act - Dismiss cookie consent if present
    await alaskaLandingPage.dismissCookieConsent();

    // Act - Wait for hero banner to fully load
    await expect(alaskaLandingPage.getHeroBanner()).toBeVisible();

    // Act - Click on 'BOOK YOUR VACATION' CTA button
    await alaskaLandingPage.clickBookYourVacationButton();

    // Assert - Verify redirection to cruise search results page
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade);
    expect(page.url()).toContain('trade=A');
  });
});
