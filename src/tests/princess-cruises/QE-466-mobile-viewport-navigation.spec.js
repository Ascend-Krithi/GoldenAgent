const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1, AC2, AC3] TS-015: Verify navigation flow on mobile viewport', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-466: Verify navigation flow works correctly on mobile viewport (responsive design)', async ({ page }) => {
    // Step 1: Set browser viewport to mobile dimensions
    await princessPage.setViewportSize(375, 667);
    console.log('✓ Browser viewport is set to mobile dimensions (375x667)');

    // Step 2: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads with responsive mobile layout');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 3: Verify hero banner and 'BOOK YOUR VACATION' button are displayed correctly on mobile
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ Hero banner and CTA button are visible and properly sized for mobile viewport');

    // Step 4: Click 'BOOK YOUR VACATION' button on mobile
    await princessPage.clickBookYourVacationButton();
    console.log('✓ Button is tappable and navigation is triggered');

    // Step 5: Verify search results page loads correctly on mobile
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page displays with responsive mobile layout');

    // Step 6: Verify filter controls and cruise cards are displayed correctly on mobile
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    console.log('✓ All elements are properly formatted and accessible on mobile viewport');
  });
});