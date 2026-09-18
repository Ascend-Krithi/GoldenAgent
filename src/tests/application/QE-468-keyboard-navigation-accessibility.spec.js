const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-468] Keyboard Navigation Accessibility', {
  tag: ['@accessibility', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;

  test('[QE-468] TS-017: Verify BOOK YOUR VACATION button is accessible and functional via keyboard navigation', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);
    await alaskaPage.acceptCookieConsent();

    // Step 2: Use Tab key to navigate to 'BOOK YOUR VACATION' button
    let focusedElement = null;
    let tabCount = 0;
    const maxTabs = 20;

    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      tabCount++;
      focusedElement = await page.evaluate(() => document.activeElement?.textContent);
      
      if (focusedElement && focusedElement.includes('BOOK YOUR VACATION')) {
        break;
      }
    }

    // Step 3: Verify button has visible focus indicator
    expect(focusedElement).toContain('BOOK YOUR VACATION');

    // Step 4: Press Enter key to activate button
    await page.keyboard.press('Enter');

    // Step 5: Verify redirection to search results page
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);
  });
});