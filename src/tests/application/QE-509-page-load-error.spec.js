const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Page Load Error Handling Tests', { tag: ['@negative', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-509] Verify appropriate error handling when Alaska landing page fails to load', async ({ page, context }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Simulate network connectivity issues
    await context.setOffline(true);

    // Step 2: Attempt to navigate to Alaska destination landing page
    try {
      await alaskaPage.goto();
    } catch (error) {
      // Expected to fail due to offline mode
      expect(error).toBeTruthy();
    }

    // Step 3: Restore network and verify error handling
    await context.setOffline(false);
    await alaskaPage.goto();

    // Step 4: Verify page loads successfully after network restoration
    await expect(page).toHaveURL(TD.urls.alaskaLanding);
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);
  });
});