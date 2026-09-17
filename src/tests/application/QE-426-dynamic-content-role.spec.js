const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-426] Verify dashboard widgets display dynamic content based on user role and permissions', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-426] Verify all widgets are visible for Admin role with dynamic content', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    expect(await dashboardPage.isDashboardDisplayed()).toBe(true);

    await expect(dashboardPage.isTimeAtWorkWidgetVisible()).resolves.toBe(true);
    await expect(dashboardPage.isMyActionsWidgetVisible()).resolves.toBe(true);
    await expect(dashboardPage.isQuickLaunchWidgetVisible()).resolves.toBe(true);
    await expect(dashboardPage.isBuzzLatestPostsWidgetVisible()).resolves.toBe(true);
    await expect(dashboardPage.isEmployeesOnLeaveWidgetVisible()).resolves.toBe(true);
    await expect(dashboardPage.isEmployeeDistributionSubUnitWidgetVisible()).resolves.toBe(true);
    await expect(dashboardPage.isEmployeeDistributionLocationWidgetVisible()).resolves.toBe(true);

    const isPendingSelfReviewVisible = await dashboardPage.isPendingSelfReviewVisible();
    const isCandidateToInterviewVisible = await dashboardPage.isCandidateToInterviewVisible();
    expect(isPendingSelfReviewVisible || isCandidateToInterviewVisible).toBe(true);

    const totalShortcuts = await dashboardPage.countQuickLaunchShortcuts();
    expect(totalShortcuts).toBe(6);
  });
});