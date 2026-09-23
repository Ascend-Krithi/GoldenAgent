const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/login.page');
const DashboardPage = require('../../pages/dashboard/dashboard.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-587] Verify that user is redirected to Dashboard page after successful login', { tag: '@smoke' }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-587] Verify successful login redirects to Dashboard', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Step 1: Navigate to OrangeHRM login page
    await loginPage.goto();
    await expect(page).toHaveURL(TD.loginUrl);
    
    // Step 2: Enter valid credentials
    await loginPage.enterUsername(TD.validUsername);
    await loginPage.enterPassword(TD.validPassword);
    
    // Step 3: Click Login button
    await loginPage.clickLoginButton();
    
    // Step 4: Wait for page redirection
    await page.waitForURL('**/dashboard/index', { waitUntil: 'networkidle', timeout: 15000 });
    
    // Step 5: Verify current URL is Dashboard page
    await expect(page).toHaveURL(TD.dashboardUrl);
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).toBe(TD.dashboardUrl);
    
    // Step 6: Verify Dashboard page content is loaded
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    const isDashboardHeadingVisible = await dashboardPage.isDashboardHeadingVisible();
    expect(isDashboardHeadingVisible).toBe(true);
  });
});