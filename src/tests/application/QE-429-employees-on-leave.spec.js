const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-429] Verify Employees on Leave Today widget displays current leave activity', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-429] Verify Employees on Leave Today widget displays leave information correctly', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    expect(await dashboardPage.isDashboardDisplayed()).toBe(true);

    await expect(dashboardPage.isEmployeesOnLeaveWidgetVisible()).resolves.toBe(true);

    const leaveCard = page.locator('.emp-leave-chart');
    const isLeaveCardVisible = await leaveCard.isVisible().catch(() => false);

    if (isLeaveCardVisible) {
      const leaveCardContent = await leaveCard.textContent();
      expect(leaveCardContent).toBeTruthy();
    }

    const employeeRows = page.locator('.orangehrm-leave-card-item, .orangehrm-leave-card-profile');
    const rowCount = await employeeRows.count();

    if (rowCount > 0) {
      const firstRowText = await employeeRows.first().textContent();
      expect(firstRowText).toBeTruthy();
      expect(firstRowText.length).toBeGreaterThan(0);
    }
  });
});