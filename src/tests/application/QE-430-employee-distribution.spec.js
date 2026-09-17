const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-430] Verify Employee Distribution widgets display organization analytics correctly', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-430] Verify Employee Distribution widgets display sub-unit and location analytics', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);

    await expect(dashboardPage.isEmployeeDistributionSubUnitWidgetVisible()).resolves.toBe(true);

    const subUnitWidget = page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Sub Unit', { exact: true }) }).first();
    const subUnitContent = await subUnitWidget.textContent();
    expect(subUnitContent).toContain('Employee Distribution by Sub Unit');

    const subUnitLegends = subUnitWidget.locator('.oxd-chart-legend');
    const subUnitLegendCount = await subUnitLegends.count();
    if (subUnitLegendCount > 0) {
      const legendText = await subUnitLegends.first().textContent();
      expect(legendText).toBeTruthy();
      const hasNumbers = /\d+/.test(legendText);
      expect(hasNumbers).toBe(true);
    }

    await expect(dashboardPage.isEmployeeDistributionLocationWidgetVisible()).resolves.toBe(true);

    const locationWidget = page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Location', { exact: true }) }).first();
    const locationContent = await locationWidget.textContent();
    expect(locationContent).toContain('Employee Distribution by Location');

    const locationLegends = locationWidget.locator('.oxd-chart-legend');
    const locationLegendCount = await locationLegends.count();
    if (locationLegendCount > 0) {
      const legendText = await locationLegends.first().textContent();
      expect(legendText).toBeTruthy();
      const hasNumbers = /\d+/.test(legendText);
      expect(hasNumbers).toBe(true);
    }
  });
});