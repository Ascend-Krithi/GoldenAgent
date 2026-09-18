const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-452] Alaska Landing Page Load with Hero Banner and CTA', {
  tag: ['@smoke', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;

  test('[QE-452] TS-001: Verify that the Alaska destination landing page loads successfully with hero banner and BOOK YOUR VACATION CTA button displayed', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);

    // Step 2: Verify hero banner is displayed on the page
    await alaskaPage.waitForHeroBannerLoad();
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    const isHeroHeadingVisible = await alaskaPage.isHeroHeadingVisible();
    expect(isHeroHeadingVisible).toBe(true);

    // Step 3: Verify 'BOOK YOUR VACATION' CTA button is displayed
    const isBookButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBe(true);
  });
});