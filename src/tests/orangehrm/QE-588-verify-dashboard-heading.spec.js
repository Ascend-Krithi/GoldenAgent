const { test, expect } = require('../../fixtures');
const LoginPage = require('../../pages/login/login.page');
const DashboardPage = require('../../pages/dashboard/dashboard.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-588] Verify that Dashboard heading is visible on the Dashboard page', { tag: '@smoke' }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-588] Verify Dashboard heading is displayed correctly', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Step 1: Login to OrangeHRM application
    await loginPage.goto();
    await loginPage.login(TD.validUsername, TD.validPassword);
    
    // Wait for redirect to Dashboard
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    
    // Step 2: Verify Dashboard page is loaded
    await expect(page).toHaveURL(TD.dashboardUrl);
    
    // Step 3: Locate Dashboard heading element
    const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    await expect(dashboardHeading).toBeVisible();
    
    // Step 4: Verify Dashboard heading text
    const headingText = await dashboardPage.getDashboardHeadingText();
    expect(headingText).toBe(TD.dashboardHeadingText);
    
    // Step 5: Verify heading visibility and prominence
    const isHeadingVisible = await dashboardPage.isDashboardHeadingVisible();
    expect(isHeadingVisible).toBe(true);
    await expect(page.locator('h6.oxd-topbar-header-breadcrumb-module')).toBeVisible();
  });
});