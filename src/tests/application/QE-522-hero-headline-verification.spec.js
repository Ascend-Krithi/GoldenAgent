const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Hero Headline Verification Tests', { tag: ['@smoke', '@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-522] Verify hero section displays headline "Alaska cruise line" along with BOOK YOUR VACATION button', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Verify hero section is displayed
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    // Step 3: Verify headline is displayed in hero section
    const headlineText = await alaskaPage.getPageHeadlineText();
    expect(headlineText).toBeTruthy();
    expect(headlineText.toLowerCase()).toContain('alaska');

    // Step 4: Verify BOOK YOUR VACATION button is displayed in hero section
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);
  });
});