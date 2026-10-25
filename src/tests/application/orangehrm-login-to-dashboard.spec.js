const { test, expect } = require('../../fixtures');
const OrangeHRMLoginPage = require('../../pages/orangehrm-login.page');
const OrangeHRMDashboardPage = require('../../pages/orangehrm-dashboard.page');
const testData = require('../../data/orangehrm-test-data');

test.describe('OrangeHRM Login to Dashboard Flow', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);
  });

  test('@smoke @regression OHRM-001: Verify successful login with valid credentials and dashboard access', async ({ page }) => {
    // Given: User navigates to the login page
    await loginPage.goto();
    await expect(page).toHaveURL(/\/auth\/login$/);

    // When: User verifies login page is loaded
    const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
    expect(isLoginPageLoaded).toBe(true);

    // Then: All login page elements should be visible
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // When: User enters valid credentials and clicks login
    await loginPage.loginWithValidCredentials();

    // Then: User should be redirected to dashboard
    await expect(page).toHaveURL(/\/dashboard\/index$/, { timeout: 15000 });
    
    // And: Dashboard page should be loaded
    const isDashboardLoaded = await dashboardPage.isDashboardPageLoaded();
    expect(isDashboardLoaded).toBe(true);

    // And: Dashboard heading should be visible
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('@smoke OHRM-002: Verify dashboard page loads with all global shell components', async ({ page }) => {
    // Given: User is logged in and on dashboard
    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await expect(page).toHaveURL(/\/dashboard\/index$/, { timeout: 15000 });

    // When: Dashboard page loads
    const isDashboardLoaded = await dashboardPage.isDashboardPageLoaded();
    expect(isDashboardLoaded).toBe(true);

    // Then: Global shell elements should be present
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // And: Left navigation search should be visible
    const isLeftNavSearchVisible = await dashboardPage.isLeftNavSearchVisible();
    expect(isLeftNavSearchVisible).toBe(true);

    // And: User dropdown should be visible
    const isUserDropdownVisible = await dashboardPage.isUserDropdownVisible();
    expect(isUserDropdownVisible).toBe(true);

    // And: Upgrade button should be visible
    const isUpgradeButtonVisible = await dashboardPage.isUpgradeButtonVisible();
    expect(isUpgradeButtonVisible).toBe(true);
  });

  test('@smoke @regression OHRM-003: Verify dashboard widgets and cards are displayed', async ({ page }) => {
    // Given: User is logged in and on dashboard
    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await expect(page).toHaveURL(/\/dashboard\/index$/, { timeout: 15000 });

    // When: Dashboard page loads completely
    const isDashboardLoaded = await dashboardPage.isDashboardPageLoaded();
    expect(isDashboardLoaded).toBe(true);

    // Then: Time at Work card should be visible
    const isTimeAtWorkVisible = await dashboardPage.isTimeAtWorkCardVisible();
    expect(isTimeAtWorkVisible).toBe(true);

    // And: My Actions card should be visible
    const isMyActionsVisible = await dashboardPage.isMyActionsCardVisible();
    expect(isMyActionsVisible).toBe(true);

    // And: Quick Launch card should be visible
    const isQuickLaunchVisible = await dashboardPage.isQuickLaunchCardVisible();
    expect(isQuickLaunchVisible).toBe(true);

    // And: Buzz Latest Posts card should be visible
    const isBuzzLatestPostsVisible = await dashboardPage.isBuzzLatestPostsCardVisible();
    expect(isBuzzLatestPostsVisible).toBe(true);
  });

  test('@regression OHRM-004: Verify all left navigation modules are accessible from dashboard', async ({ page }) => {
    // Given: User is logged in and on dashboard
    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await expect(page).toHaveURL(/\/dashboard\/index$/, { timeout: 15000 });

    // When: Dashboard page loads
    const isDashboardLoaded = await dashboardPage.isDashboardPageLoaded();
    expect(isDashboardLoaded).toBe(true);

    // Then: All navigation modules should be present
    const areAllModulesVisible = await dashboardPage.areAllNavigationModulesVisible();
    expect(areAllModulesVisible).toBe(true);

    // And: Left navigation search should be functional
    const isLeftNavSearchVisible = await dashboardPage.isLeftNavSearchVisible();
    expect(isLeftNavSearchVisible).toBe(true);
  });

  test('@smoke OHRM-005: Verify login page elements are present before login attempt', async ({ page }) => {
    // Given: User navigates to login page
    await loginPage.goto();

    // When: Login page loads
    await expect(page).toHaveURL(/\/auth\/login$/);

    // Then: Login heading should display correct text
    const headingText = await loginPage.getLoginHeadingText();
    expect(headingText).toBe(testData.pageHeadings.login);

    // And: Username input should be visible and enabled
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeEnabled();

    // And: Password input should be visible and enabled
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeEnabled();

    // And: Login button should be visible and enabled
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

    // And: Forgot password link should be visible
    const isForgotPasswordVisible = await loginPage.isForgotPasswordLinkVisible();
    expect(isForgotPasswordVisible).toBe(true);
  });
});
