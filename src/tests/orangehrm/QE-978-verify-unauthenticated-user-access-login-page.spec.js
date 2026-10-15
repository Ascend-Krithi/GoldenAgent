const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');

test.describe('[QE-378][AC1] Verify unauthenticated user can access OrangeHRM login page successfully', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('QE-978: Unauthenticated user can access OrangeHRM login page successfully', async ({ page }) => {
    // Step 1: Open web browser - handled by Playwright fixture
    console.log('Step 1: Browser opened successfully');

    // Step 2: Navigate to OrangeHRM login URL
    await loginPage.goto();
    console.log('Step 2: Navigated to OrangeHRM login URL');

    // Verify URL is correct
    await expect(page).toHaveURL(TD.urlPatterns.login);
    console.log('Verified: Login page URL is correct');

    // Verify page loads without errors
    await expect(page).not.toHaveTitle(/error/i);
    console.log('Verified: Page loaded without errors');

    // Step 3: Verify page title and branding
    const isLogoVisible = await loginPage.isOrangeHRMLogoVisible();
    expect(isLogoVisible).toBeTruthy();
    console.log('Verified: OrangeHRM logo is visible');

    // Verify login heading is visible
    await expect(loginPage.page.getByRole('heading', { name: TD.pageTitles.login })).toBeVisible();
    console.log('Verified: Login heading is visible');

    // Verify login form is present
    const isUsernameVisible = await loginPage.isUsernameInputVisible();
    const isPasswordVisible = await loginPage.isPasswordInputVisible();
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    
    expect(isUsernameVisible).toBeTruthy();
    expect(isPasswordVisible).toBeTruthy();
    expect(isLoginButtonVisible).toBeTruthy();
    console.log('Verified: Login form elements are displayed');

    console.log('Test QE-978 completed successfully');
  });
});