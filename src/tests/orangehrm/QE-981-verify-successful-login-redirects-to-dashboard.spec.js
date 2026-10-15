const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('[QE-378][AC4] Verify successful login redirects user to Dashboard page with correct URL', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('QE-981: Successful login redirects user to Dashboard page with correct URL', async ({ page }) => {
    // Step 1: Login with valid credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.username, TD.credentials.password);
    console.log('Step 1: Submitted valid credentials');

    // Step 2: Wait for page redirect after login
    await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
    console.log('Step 2: Page redirect initiated');

    // Step 3: Verify current URL matches Dashboard URL
    await expect(page).toHaveURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    console.log('Step 3: Verified current URL matches Dashboard URL');

    // Verify exact URL
    const currentUrl = page.url();
    expect(currentUrl).toBe(TD.urls.dashboard);
    console.log('Verified: Current URL is exactly ' + TD.urls.dashboard);

    // Step 4: Verify page has fully loaded
    await page.waitForLoadState('load');
    await dashboardPage.waitForDashboardToLoad();
    console.log('Step 4: Dashboard page fully loaded');

    // Verify no loading indicators are present
    const loadingSpinner = page.locator('.oxd-loading-spinner');
    const spinnerCount = await loadingSpinner.count();
    if (spinnerCount > 0) {
      await expect(loadingSpinner).toBeHidden({ timeout: 5000 });
    }
    console.log('Verified: Dashboard loaded without loading indicators');

    console.log('Test QE-981 completed successfully');
  });
});