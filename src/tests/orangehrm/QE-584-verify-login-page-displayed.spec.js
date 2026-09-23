const { test, expect } = require('../../fixtures');
const LoginPage = require('../../pages/login/login.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-584] Verify that the OrangeHRM login page is displayed when user opens the application', { tag: '@smoke' }, () => {
  let loginPage;

  test('[QE-584] Verify login page loads with all required elements', async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Step 1: Open web browser - handled by Playwright
    // Step 2: Navigate to OrangeHRM application URL
    await loginPage.goto();
    
    // Expected: OrangeHRM login page is displayed with login form visible
    await expect(page).toHaveURL(TD.loginUrl);
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Step 3: Verify page title
    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toContain('OrangeHRM');
    
    // Step 4: Verify page URL
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toBe(TD.loginUrl);
  });
});