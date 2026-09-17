const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-422] Verify Quick Launch widget displays all six expected shortcuts', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-422] Verify Quick Launch widget displays all six expected shortcuts', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    expect(await dashboardPage.isDashboardDisplayed()).toBe(true);

    await expect(dashboardPage.isQuickLaunchWidgetVisible()).resolves.toBe(true);

    await expect(dashboardPage.isQuickLaunchShortcutVisible(TD.shortcuts.assignLeave)).resolves.toBe(true);

    await expect(dashboardPage.isQuickLaunchShortcutVisible(TD.shortcuts.leaveList)).resolves.toBe(true);

    await expect(dashboardPage.isQuickLaunchShortcutVisible(TD.shortcuts.timesheets)).resolves.toBe(true);

    await expect(dashboardPage.isQuickLaunchShortcutVisible(TD.shortcuts.applyLeave)).resolves.toBe(true);

    await expect(dashboardPage.isQuickLaunchShortcutVisible(TD.shortcuts.myLeave)).resolves.toBe(true);

    await expect(dashboardPage.isQuickLaunchShortcutVisible(TD.shortcuts.myTimesheet)).resolves.toBe(true);

    const totalShortcuts = await dashboardPage.countQuickLaunchShortcuts();
    expect(totalShortcuts).toBe(6);
  });
});