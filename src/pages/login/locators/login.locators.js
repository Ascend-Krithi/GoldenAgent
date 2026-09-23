const locators = {
  loginHeading: (page) => page.getByRole('heading', { name: 'Login' }).first(),
  usernameInput: (page) => page.locator('input[name="username"]').first(),
  passwordInput: (page) => page.locator('input[name="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"]').first(),
  forgotPasswordLink: (page) => page.locator('p.orangehrm-login-forgot-header').first(),
  demoUsernameHint: (page) => page.getByText('Username : Admin', { exact: true }).first()
};

module.exports = locators;