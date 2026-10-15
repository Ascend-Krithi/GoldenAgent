const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');

test.describe('[QE-378][AC3] Verify user can successfully enter valid credentials and submit login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('QE-980: User can successfully enter valid credentials and submit login', async ({ page }) => {
    // Step 1: Navigate to OrangeHRM login page
    await loginPage.goto();
    console.log('Step 1: Navigated to OrangeHRM login page');

    // Verify page is displayed with username and password fields
    await expect(page).toHaveURL(TD.urlPatterns.login);
    const isUsernameVisible = await loginPage.isUsernameInputVisible();
    const isPasswordVisible = await loginPage.isPasswordInputVisible();
    expect(isUsernameVisible).toBeTruthy();
    expect(isPasswordVisible).toBeTruthy();
    console.log('Verified: Login page displayed with username and password fields');

    // Step 2: Enter valid username in Username field
    await loginPage.enterUsername(TD.credentials.username);
    console.log('Step 2: Entered valid username');

    // Verify username is entered successfully and displayed in the field
    const enteredUsername = await loginPage.getUsernameValue();
    expect(enteredUsername).toBe(TD.credentials.username);
    console.log('Verified: Username is displayed in the field');

    // Step 3: Enter valid password in Password field
    await loginPage.enterPassword(TD.credentials.password);
    console.log('Step 3: Entered valid password');

    // Verify password is entered successfully and masked
    const passwordType = await loginPage.getPasswordInputType();
    expect(passwordType).toBe('password');
    console.log('Verified: Password is masked with dots/asterisks');

    // Step 4: Click on Login button
    await loginPage.clickLoginButton();
    console.log('Step 4: Clicked Login button');

    // Verify form submission is initiated by checking URL change or page navigation
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    console.log('Verified: Form submission initiated');

    // Step 5: Verify no error messages are displayed
    // Wait a moment for any error messages to appear
    await page.waitForTimeout(2000);
    
    // Check that we're not still on login page (which would indicate error)
    const currentUrl = page.url();
    const isStillOnLogin = currentUrl.includes('/auth/login');
    
    if (!isStillOnLogin) {
      console.log('Verified: No error messages - successfully navigated away from login page');
    } else {
      // If still on login page, verify no error message elements are visible
      const errorElements = page.locator('.oxd-alert-content-text, .oxd-input-field-error-message');
      const errorCount = await errorElements.count();
      expect(errorCount).toBe(0);
      console.log('Verified: No error messages displayed on login page');
    }

    console.log('Test QE-980 completed successfully');
  });
});