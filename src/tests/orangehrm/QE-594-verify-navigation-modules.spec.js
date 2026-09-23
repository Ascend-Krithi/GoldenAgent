const { test, expect } = require('../../fixtures');
const LoginPage = require('../../pages/login/login.page');
const DashboardPage = require('../../pages/dashboard/dashboard.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-594] Verify that global navigation modules are visible on Dashboard', { tag: '@smoke' }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-594] Verify all navigation modules are visible', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Step 1: Login to OrangeHRM application
    await loginPage.goto();
    await loginPage.login(TD.validUsername, TD.validPassword);
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    
    // Step 2: Locate left side navigation panel
    const navPanel = page.locator('aside').first();
    await expect(navPanel).toBeVisible();
    
    // Step 3: Verify 'Admin' module is visible
    const isAdminVisible = await dashboardPage.isAdminModuleVisible();
    expect(isAdminVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/admin/viewAdminModule"]')).toBeVisible();
    
    // Step 4: Verify 'PIM' module is visible
    const isPimVisible = await dashboardPage.isPimModuleVisible();
    expect(isPimVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/pim/viewPimModule"]')).toBeVisible();
    
    // Step 5: Verify 'Leave' module is visible
    const isLeaveVisible = await dashboardPage.isLeaveModuleVisible();
    expect(isLeaveVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/leave/viewLeaveModule"]')).toBeVisible();
    
    // Step 6: Verify 'Time' module is visible
    const isTimeVisible = await dashboardPage.isTimeModuleVisible();
    expect(isTimeVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/time/viewTimeModule"]')).toBeVisible();
    
    // Step 7: Verify 'Recruitment' module is visible
    const isRecruitmentVisible = await dashboardPage.isRecruitmentModuleVisible();
    expect(isRecruitmentVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/recruitment/viewRecruitmentModule"]')).toBeVisible();
    
    // Step 8: Verify 'My Info' module is visible
    const isMyInfoVisible = await dashboardPage.isMyInfoModuleVisible();
    expect(isMyInfoVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/pim/viewMyDetails"]')).toBeVisible();
    
    // Step 9: Verify 'Performance' module is visible
    const isPerformanceVisible = await dashboardPage.isPerformanceModuleVisible();
    expect(isPerformanceVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/performance/viewPerformanceModule"]')).toBeVisible();
    
    // Step 10: Verify 'Dashboard' module is visible
    const isDashboardVisible = await dashboardPage.isDashboardModuleVisible();
    expect(isDashboardVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/dashboard/index"]')).toBeVisible();
    
    // Step 11: Verify 'Directory' module is visible
    const isDirectoryVisible = await dashboardPage.isDirectoryModuleVisible();
    expect(isDirectoryVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/directory/viewDirectory"]')).toBeVisible();
    
    // Step 12: Verify 'Maintenance' module is visible
    const isMaintenanceVisible = await dashboardPage.isMaintenanceModuleVisible();
    expect(isMaintenanceVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/maintenance/viewMaintenanceModule"]')).toBeVisible();
    
    // Step 13: Verify 'Claim' module is visible
    const isClaimVisible = await dashboardPage.isClaimModuleVisible();
    expect(isClaimVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/claim/viewClaimModule"]')).toBeVisible();
    
    // Step 14: Verify 'Buzz' module is visible
    const isBuzzVisible = await dashboardPage.isBuzzModuleVisible();
    expect(isBuzzVisible).toBe(true);
    await expect(page.locator('aside a[href="/web/index.php/buzz/viewBuzz"]')).toBeVisible();
  });
});