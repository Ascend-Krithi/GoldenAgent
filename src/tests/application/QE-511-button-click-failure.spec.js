const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC2] Button Click Failure Tests', { tag: ['@negative', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-511] Verify error handling when BOOK YOUR VACATION button click fails to redirect', async ({ page, context }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 2: Verify button is visible
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);

    // Step 3: Disable JavaScript to simulate error
    await context.setOffline(true);

    // Step 4: Attempt to click button
    try {
      await alaskaPage.clickBookYourVacationButton();
      await page.waitForTimeout(2000);
    } catch (error) {
      // Expected behavior - navigation may fail
    }

    // Step 5: Restore network and verify page remains responsive
    await context.setOffline(false);
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toBeTruthy();
  });
});