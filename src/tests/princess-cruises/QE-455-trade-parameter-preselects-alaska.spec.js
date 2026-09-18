const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC2] TS-004: Verify trade=A URL parameter pre-selects Alaska destination', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-455: Verify that trade=A URL parameter automatically pre-selects Alaska as the destination filter on search results page', async ({ page }) => {
    // Step 1: Navigate to Alaska landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Click 'BOOK YOUR VACATION' button
    await princessPage.clickBookYourVacationButton();
    console.log('✓ User is redirected to search results page');

    // Step 3: Verify URL contains trade=A parameter
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    const hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ URL contains trade=A parameter');

    // Step 4: Verify Alaska destination filter is pre-selected
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    console.log('✓ Alaska is automatically selected in the destination filter');
  });
});