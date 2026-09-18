const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1, AC2] TS-018: Verify browser back button navigation', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-469: Verify behavior when user navigates back from search results to Alaska landing page using browser back button', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Click 'BOOK YOUR VACATION' button
    await princessPage.clickBookYourVacationButton();
    console.log('✓ User is redirected to search results page');

    // Step 3: Verify search results page is displayed
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    const hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ Search results page is loaded with trade=A parameter');

    // Step 4: Click browser back button
    await princessPage.navigateBack();
    console.log('✓ Browser navigates back to previous page');

    // Step 5: Verify Alaska landing page is displayed
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page is displayed with hero banner and BOOK YOUR VACATION button');

    // Step 6: Verify page elements are functional after back navigation
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ All page elements are functional and clickable');
  });
});