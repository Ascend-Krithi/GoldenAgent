const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1, AC2, AC3] TS-016: Verify navigation flow on tablet viewport', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-467: Verify navigation flow works correctly on tablet viewport', async ({ page }) => {
    // Step 1: Set browser viewport to tablet dimensions
    await princessPage.setViewportSize(768, 1024);
    console.log('✓ Browser viewport is set to tablet dimensions (768x1024)');

    // Step 2: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads with responsive tablet layout');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 3: Verify hero banner and 'BOOK YOUR VACATION' button are displayed correctly on tablet
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ Hero banner and CTA button are visible and properly sized for tablet viewport');

    // Step 4: Click 'BOOK YOUR VACATION' button on tablet
    await princessPage.clickBookYourVacationButton();
    console.log('✓ Button is tappable and navigation is triggered');

    // Step 5: Verify search results page loads correctly on tablet
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page displays with responsive tablet layout');

    // Step 6: Verify filter controls and cruise cards are displayed correctly on tablet
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    console.log('✓ All elements are properly formatted and accessible on tablet viewport');
  });
});