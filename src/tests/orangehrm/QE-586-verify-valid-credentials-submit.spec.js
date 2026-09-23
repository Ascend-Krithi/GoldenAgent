const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/login.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-586] Verify that user can successfully enter valid credentials and submit login', { tag: '@smoke' }, () => {
  let loginPage;

  test('[QE-586] Verify user can enter credentials and submit login form', async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Step 1: Navigate to OrangeHRM login page
    await loginPage.goto();
    await expect(page).toHaveURL(TD.loginUrl);
    
    // Step 2: Enter valid username in Username field
    await loginPage.enterUsername(TD.validUsername);
    await expect(page.locator('input[name="username"]')).toHaveValue(TD.validUsername);
    
    // Step 3: Enter valid password in Password field
    await loginPage.enterPassword(TD.validPassword);
    await expect(page.locator('input[name="password"]')).toHaveValue(TD.validPassword);
    
    // Step 4: Click on Login button
    await loginPage.clickLoginButton();
    
    // Step 5: Verify no error messages are displayed
    await page.waitForLoadState('domcontentloaded');
    const errorMessage = page.locator('.oxd-alert--error').first();
    await expect(errorMessage).not.toBeVisible();
  });
});