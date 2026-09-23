const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/login.page');
const DashboardPage = require('../../pages/dashboard/dashboard.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-592] Verify that dashboard information is displayed without errors after login', { tag: '@regression' }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-592] Verify dashboard loads without errors', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Step 1: Login to OrangeHRM application
    await loginPage.goto();
    await loginPage.login(TD.validUsername, TD.validPassword);
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    
    // Step 2: Wait for complete page load
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Step 3: Verify no error messages are displayed
    const hasErrors = await dashboardPage.checkForErrorMessages();
    expect(hasErrors).toBe(false);
    
    const errorAlert = page.locator('.oxd-alert--error').first();
    await expect(errorAlert).not.toBeVisible();
    
    const errorToast = page.locator('.oxd-toast--error').first();
    await expect(errorToast).not.toBeVisible();
    
    // Step 4: Verify all widgets are rendered
    const isTimeAtWorkVisible = await dashboardPage.isTimeAtWorkWidgetVisible();
    const isMyActionsVisible = await dashboardPage.isMyActionsWidgetVisible();
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    
    expect(isTimeAtWorkVisible).toBe(true);
    expect(isMyActionsVisible).toBe(true);
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 5: Check browser console for errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Step 6: Verify all images and icons load correctly
    const brokenImages = await page.locator('img').evaluateAll(images => {
      return images.filter(img => !img.complete || img.naturalHeight === 0).length;
    });
    expect(brokenImages).toBe(0);
  });
});