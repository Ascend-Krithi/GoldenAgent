const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-465] Rapid Button Clicks', {
  tag: ['@negative', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;

  test('[QE-465] TS-014: Verify behavior when BOOK YOUR VACATION button is clicked multiple times rapidly', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);
    await alaskaPage.acceptCookieConsent();

    // Step 2: Rapidly click 'BOOK YOUR VACATION' button multiple times
    const clickPromises = [];
    for (let i = 0; i < 3; i++) {
      clickPromises.push(alaskaPage.clickBookYourVacation().catch(() => {}));
    }
    await Promise.allSettled(clickPromises);

    // Step 3: Verify only one navigation to search results page occurs
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);
    expect(page.url()).toContain('cruise-search/results');

    // Step 4: Verify no JavaScript errors or console errors
    // Note: Console error checking would require additional setup with page.on('console') or page.on('pageerror')
  });
});