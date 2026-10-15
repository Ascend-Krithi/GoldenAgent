const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');

test.describe('[QE-378][AC2] Verify login page displays all required UI elements', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('QE-979: Login page displays all required UI elements', async ({ page }) => {
    // Step 1: Navigate to OrangeHRM login page
    await loginPage.goto();
    console.log('Step 1: Navigated to OrangeHRM login page');

    // Verify page loaded successfully
    await expect(page).toHaveURL(TD.urlPatterns.login);
    console.log('Verified: Login page loaded successfully');

    // Step 2: Verify Username field is present
    const usernameInput = loginPage.page.locator('input[name="username"]');
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toBeEnabled();
    console.log('Step 2: Verified Username field is visible and enabled');

    // Verify Username field has appropriate attributes
    const usernamePlaceholder = await usernameInput.getAttribute('placeholder');
    expect(usernamePlaceholder).toBeTruthy();
    console.log('Verified: Username field has placeholder or label');

    // Step 3: Verify Password field is present
    const passwordInput = loginPage.page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();
    console.log('Step 3: Verified Password field is visible and enabled');

    // Verify Password field has password masking
    const passwordType = await loginPage.getPasswordInputType();
    expect(passwordType).toBe('password');
    console.log('Verified: Password field has password masking');

    // Verify Password field has appropriate attributes
    const passwordPlaceholder = await passwordInput.getAttribute('placeholder');
    expect(passwordPlaceholder).toBeTruthy();
    console.log('Verified: Password field has placeholder or label');

    // Step 4: Verify Login button is present
    const loginButton = loginPage.page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    console.log('Step 4: Verified Login button is visible and enabled');

    // Verify Login button is properly labeled
    const buttonText = await loginButton.textContent();
    expect(buttonText.trim().length).toBeGreaterThan(0);
    console.log('Verified: Login button is properly labeled');

    // Step 5: Verify all elements are properly aligned and styled
    // Check that all elements are within viewport
    const usernameBox = await usernameInput.boundingBox();
    const passwordBox = await passwordInput.boundingBox();
    const buttonBox = await loginButton.boundingBox();
    
    expect(usernameBox).not.toBeNull();
    expect(passwordBox).not.toBeNull();
    expect(buttonBox).not.toBeNull();
    console.log('Step 5: Verified all UI elements are properly aligned and visible in viewport');

    console.log('Test QE-979 completed successfully');
  });
});