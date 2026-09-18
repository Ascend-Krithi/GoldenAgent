const { test, expect } = require('@playwright/test');
const AlaskaLandingPage = require('../../pages/princess-cruises/alaska-landing.page');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-455] Verify trade=A parameter pre-selects Alaska destination', () => {
  let alaskaLandingPage;
  let cruiseSearchPage;

  test.beforeEach(async ({ page }) => {
    alaskaLandingPage = new AlaskaLandingPage(page);
    cruiseSearchPage = new CruiseSearchPage(page);
  });

  test('[QE-455] TS-004: Verify that trade=A URL parameter automatically pre-selects Alaska as the destination filter on search results page', { timeout: 90000 }, async ({ page }) => {
    // Arrange - Navigate to Alaska landing page
    await alaskaLandingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.alaskaLanding);

    // Act - Dismiss cookie consent if present
    await alaskaLandingPage.dismissCookieConsent();

    // Act - Click 'BOOK YOUR VACATION' button
    await alaskaLandingPage.clickBookYourVacationButton();

    // Assert - Verify URL contains trade=A parameter
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade, { timeout: 60000 });
    expect(page.url()).toContain('trade=A');

    // Assert - Verify Alaska destination filter is pre-selected
    const isAlaskaSelected = await cruiseSearchPage.isAlaskaDestinationSelected();
    expect(isAlaskaSelected).toBeTruthy();
  });
});
