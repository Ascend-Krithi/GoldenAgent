const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-424] Verify top bar displays Dashboard page title and Upgrade button', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-424] Verify top bar displays Dashboard title, Upgrade button, and profile avatar', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    await expect(loginPage.isLoginPageDisplayed()).resolves.toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);

    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);

    const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    await expect(dashboardHeading).toBeVisible();
    await expect(dashboardHeading).toHaveText('Dashboard');

    await expect(dashboardPage.isUpgradeButtonVisible()).resolves.toBe(true);

    await expect(dashboardPage.isUserDropdownVisible()).resolves.toBe(true);
  });
});