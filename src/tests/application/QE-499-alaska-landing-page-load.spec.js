const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Alaska Landing Page Load Tests', { tag: ['@smoke', '@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-499] Verify Alaska destination landing page loads successfully with hero banner and BOOK YOUR VACATION button displayed', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Verify hero banner is displayed on the page
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    // Step 3: Verify BOOK YOUR VACATION button is present in the hero section
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);
  });
});