const { test, expect } = require('../../fixtures');
const LoginPage = require('../../pages/login/login.page');
const DashboardPage = require('../../pages/dashboard/dashboard.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-591] Verify that Quick Launch widget is visible on the Dashboard page', { tag: '@smoke' }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-591] Verify Quick Launch widget is displayed', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Step 1: Login to OrangeHRM application
    await loginPage.goto();
    await loginPage.login(TD.validUsername, TD.validPassword);
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    
    // Step 2: Wait for Dashboard widgets to load
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.orangehrm-dashboard-widget', { timeout: 10000 });
    
    // Step 3: Locate Quick Launch widget
    const quickLaunchWidget = page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Quick Launch', { exact: true }) });
    await expect(quickLaunchWidget.first()).toBeVisible();
    
    // Step 4: Verify widget title
    const widgetTitle = page.getByText('Quick Launch', { exact: true });
    await expect(widgetTitle).toBeVisible();
    
    // Step 5: Verify widget is fully visible
    const isWidgetVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isWidgetVisible).toBe(true);
  });
});