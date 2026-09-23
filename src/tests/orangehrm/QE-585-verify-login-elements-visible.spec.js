const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/login.page');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-585] Verify that Username field, Password field, and Login button are visible on the login page', { tag: '@smoke' }, () => {
  let loginPage;

  test('[QE-585] Verify all login form elements are visible and interactable', async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Step 1: Navigate to OrangeHRM login page
    await loginPage.goto();
    await expect(page).toHaveURL(TD.loginUrl);
    
    // Step 2: Verify Username field is visible
    const isUsernameVisible = await loginPage.isUsernameFieldVisible();
    expect(isUsernameVisible).toBe(true);
    await expect(page.locator('input[name="username"]')).toBeVisible();
    
    // Step 3: Verify Password field is visible
    const isPasswordVisible = await loginPage.isPasswordFieldVisible();
    expect(isPasswordVisible).toBe(true);
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
    
    // Step 4: Verify Login button is visible
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBe(true);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Step 5: Verify all elements are enabled and interactable
    const isUsernameEnabled = await loginPage.isUsernameFieldEnabled();
    const isPasswordEnabled = await loginPage.isPasswordFieldEnabled();
    const isLoginButtonEnabled = await loginPage.isLoginButtonEnabled();
    
    expect(isUsernameEnabled).toBe(true);
    expect(isPasswordEnabled).toBe(true);
    expect(isLoginButtonEnabled).toBe(true);
    
    await expect(page.locator('input[name="username"]')).toBeEnabled();
    await expect(page.locator('input[name="password"]')).toBeEnabled();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
});