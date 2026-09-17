const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-423] Verify unauthenticated users cannot directly access Dashboard and are redirected to login', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;

  test('[QE-423] Verify unauthenticated users are redirected to login page when accessing Dashboard', async ({ page, context }) => {
    loginPage = new OrangeHRMLoginPage(page);

    await context.clearCookies();

    await page.goto(TD.urls.dashboard, { waitUntil: 'domcontentloaded', timeout: 60000 });

    await page.waitForURL(TD.urlPatterns.login, { timeout: 10000 });
    await expect(page).toHaveURL(TD.urlPatterns.login);

    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await expect(loginPage.isUsernameFieldVisible()).resolves.toBe(true);
    await expect(loginPage.isPasswordFieldVisible()).resolves.toBe(true);
    await expect(loginPage.isLoginButtonVisible()).resolves.toBe(true);

    const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    await expect(dashboardHeading).not.toBeVisible();
  });
});