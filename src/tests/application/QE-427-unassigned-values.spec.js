const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-427] Verify dashboard handles unassigned values in Employee Distribution widgets appropriately', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-427] Verify unassigned values are displayed correctly in Employee Distribution widgets', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    await expect(loginPage.isLoginPageDisplayed()).resolves.toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);

    await expect(dashboardPage.isEmployeeDistributionSubUnitWidgetVisible()).resolves.toBe(true);

    const unassignedSubUnitLegend = page.locator('.oxd-chart-legend .oxd-text--span[title="Unassigned"]').first();
    const isUnassignedSubUnitVisible = await unassignedSubUnitLegend.isVisible().catch(() => false);

    if (isUnassignedSubUnitVisible) {
      const unassignedText = await unassignedSubUnitLegend.textContent();
      expect(unassignedText).toContain('Unassigned');
      const countMatch = unassignedText.match(/\d+/);
      if (countMatch) {
        const count = parseInt(countMatch[0], 10);
        expect(count).toBeGreaterThanOrEqual(TD.countRanges.min);
        expect(Number.isInteger(count)).toBe(true);
      }
    }

    await expect(dashboardPage.isEmployeeDistributionLocationWidgetVisible()).resolves.toBe(true);

    const unassignedLocationLegend = page.locator('.oxd-chart-legend .oxd-text--span[title="Unassigned"]').last();
    const isUnassignedLocationVisible = await unassignedLocationLegend.isVisible().catch(() => false);

    if (isUnassignedLocationVisible) {
      const unassignedText = await unassignedLocationLegend.textContent();
      expect(unassignedText).toContain('Unassigned');
      const countMatch = unassignedText.match(/\d+/);
      if (countMatch) {
        const count = parseInt(countMatch[0], 10);
        expect(count).toBeGreaterThanOrEqual(TD.countRanges.min);
        expect(Number.isInteger(count)).toBe(true);
      }
    }
  });
});