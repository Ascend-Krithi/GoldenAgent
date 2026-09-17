const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-428] Verify Buzz Latest Posts widget displays recent internal social posts', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-428] Verify Buzz Latest Posts widget displays post content correctly', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    await expect(dashboardPage.isDashboardDisplayed()).resolves.toBe(true);

    await expect(dashboardPage.isBuzzLatestPostsWidgetVisible()).resolves.toBe(true);

    const buzzWidget = page.locator('.orangehrm-buzz-widget');
    const isBuzzWidgetVisible = await buzzWidget.isVisible().catch(() => false);

    if (isBuzzWidgetVisible) {
      const buzzContent = await buzzWidget.textContent();
      expect(buzzContent).toBeTruthy();
      expect(buzzContent.length).toBeGreaterThan(0);
    }
  });
});