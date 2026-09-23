const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/login.page');
const DashboardPage = require('../../pages/dashboard/dashboard.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-593] Verify that Quick Launch shortcuts are accessible and navigate correctly', { tag: '@regression' }, () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Login before each test
    await loginPage.goto();
    await loginPage.login(TD.validUsername, TD.validPassword);
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
  });

  test('[QE-593-1] Verify Assign Leave shortcut navigation', async ({ page }) => {
    // Step 2: Locate Quick Launch widget
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 3: Click on 'Assign Leave' shortcut
    await dashboardPage.clickAssignLeaveShortcut();
    await page.waitForLoadState('domcontentloaded');
    
    // Expected: User is navigated to Assign Leave page
    await expect(page).toHaveURL(/.*leave\/assignLeave.*/i);
    
    // Step 4: Navigate back to Dashboard
    await dashboardPage.clickDashboardModule();
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    await expect(page).toHaveURL(TD.dashboardUrl);
  });

  test('[QE-593-2] Verify Leave List shortcut navigation', async ({ page }) => {
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 5: Click on 'Leave List' shortcut
    await dashboardPage.clickLeaveListShortcut();
    await page.waitForLoadState('domcontentloaded');
    
    // Expected: User is navigated to Leave List page
    await expect(page).toHaveURL(/.*leave\/viewLeaveList.*/i);
    
    // Step 6: Navigate back to Dashboard
    await dashboardPage.clickDashboardModule();
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    await expect(page).toHaveURL(TD.dashboardUrl);
  });

  test('[QE-593-3] Verify Timesheets shortcut navigation', async ({ page }) => {
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 7: Click on 'Timesheets' shortcut
    await dashboardPage.clickTimesheetsShortcut();
    await page.waitForLoadState('domcontentloaded');
    
    // Expected: User is navigated to Timesheets page
    await expect(page).toHaveURL(/.*time\/viewEmployeeTimesheet.*/i);
    
    // Step 8: Navigate back to Dashboard
    await dashboardPage.clickDashboardModule();
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    await expect(page).toHaveURL(TD.dashboardUrl);
  });

  test('[QE-593-4] Verify Apply Leave shortcut navigation', async ({ page }) => {
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 9: Click on 'Apply Leave' shortcut
    await dashboardPage.clickApplyLeaveShortcut();
    await page.waitForLoadState('domcontentloaded');
    
    // Expected: User is navigated to Apply Leave page
    await expect(page).toHaveURL(/.*leave\/applyLeave.*/i);
    
    // Step 10: Navigate back to Dashboard
    await dashboardPage.clickDashboardModule();
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    await expect(page).toHaveURL(TD.dashboardUrl);
  });

  test('[QE-593-5] Verify My Leave shortcut navigation', async ({ page }) => {
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 11: Click on 'My Leave' shortcut
    await dashboardPage.clickMyLeaveShortcut();
    await page.waitForLoadState('domcontentloaded');
    
    // Expected: User is navigated to My Leave page
    await expect(page).toHaveURL(/.*leave\/viewMyLeaveList.*/i);
    
    // Step 12: Navigate back to Dashboard
    await dashboardPage.clickDashboardModule();
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    await expect(page).toHaveURL(TD.dashboardUrl);
  });

  test('[QE-593-6] Verify My Timesheet shortcut navigation', async ({ page }) => {
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchWidgetVisible();
    expect(isQuickLaunchVisible).toBe(true);
    
    // Step 13: Click on 'My Timesheet' shortcut
    await dashboardPage.clickMyTimesheetShortcut();
    await page.waitForLoadState('domcontentloaded');
    
    // Expected: User is navigated to My Timesheet page
    await expect(page).toHaveURL(/.*time\/viewMyTimesheet.*/i);
    
    // Verify all shortcuts are functional
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).toMatch(/time\/viewMyTimesheet/i);
  });
});