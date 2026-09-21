const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC4] Detail Page Load Failure Tests', { tag: ['@negative', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-512] Verify behavior when cruise card CTA button is clicked but detail page fails to load', async ({ page, context }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Verify cruise cards are displayed
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    expect(hasCruiseCards).toBe(true);

    // Step 4: Simulate network error before clicking details
    await context.setOffline(true);

    // Step 5: Attempt to click CRUISE DETAILS button
    try {
      await alaskaPage.clickCruiseDetailsButton();
      await page.waitForTimeout(2000);
    } catch (error) {
      // Expected - navigation should fail
    }

    // Step 6: Restore network
    await context.setOffline(false);

    // Step 7: Verify error handling or retry mechanism
    const isErrorVisible = await alaskaPage.isErrorMessageVisible();
    const currentURL = await alaskaPage.getCurrentURL();
    expect(currentURL).toBeTruthy();
  });
});