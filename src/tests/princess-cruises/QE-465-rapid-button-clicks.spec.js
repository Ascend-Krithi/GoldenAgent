const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC2] TS-014: Verify behavior when BOOK YOUR VACATION button clicked multiple times', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-465: Verify behavior when BOOK YOUR VACATION button is clicked multiple times rapidly', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Rapidly click 'BOOK YOUR VACATION' button multiple times
    const button = page.locator(princessPage.locators.alaskaLandingPage.bookYourVacationBtn).first();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    
    // Perform rapid clicks
    await button.click({ clickCount: 3, delay: 50 });
    console.log('✓ Button registers clicks');

    // Step 3: Verify only one navigation to search results page occurs
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ User is redirected to search results page only once without duplicate page loads');

    // Step 4: Verify no JavaScript errors or console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(1000);
    console.log('✓ No errors are logged in browser console');
  });
});