const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1] TS-001: Verify Alaska destination landing page loads successfully', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-452: Verify that the Alaska destination landing page loads successfully with hero banner and BOOK YOUR VACATION CTA button displayed', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    
    // Verify: Alaska destination landing page loads successfully
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska destination landing page loaded successfully');

    // Step 2: Verify hero banner is displayed on the page
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    console.log('✓ Hero banner is visible and fully rendered');

    // Step 3: Verify 'BOOK YOUR VACATION' CTA button is displayed
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ BOOK YOUR VACATION button is visible and clickable');
  });
});