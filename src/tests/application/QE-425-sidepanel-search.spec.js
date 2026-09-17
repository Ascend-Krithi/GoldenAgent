const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-425] Verify sidepanel search textbox filters modules in left navigation', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-425] Verify sidepanel search filters navigation modules correctly', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);

    await dashboardPage.searchSidenavModule('Leave');
    await page.waitForTimeout(1000);

    await expect(dashboardPage.isNavModuleVisible(TD.modules.leave)).resolves.toBe(true);

    const isAdminVisible = await dashboardPage.isNavModuleVisible(TD.modules.admin);
    const isPIMVisible = await dashboardPage.isNavModuleVisible(TD.modules.pim);
    const isTimeVisible = await dashboardPage.isNavModuleVisible(TD.modules.time);

    expect(isAdminVisible || isPIMVisible || isTimeVisible).toBe(false);

    await dashboardPage.clearSidenavSearch();
    await page.waitForTimeout(1000);

    await expect(dashboardPage.isNavModuleVisible(TD.modules.admin)).resolves.toBe(true);
    await expect(dashboardPage.isNavModuleVisible(TD.modules.pim)).resolves.toBe(true);
    await expect(dashboardPage.isNavModuleVisible(TD.modules.leave)).resolves.toBe(true);
  });
});