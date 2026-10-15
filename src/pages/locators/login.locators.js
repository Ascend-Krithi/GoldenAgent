const locators = {
  loginHeading: (page) => page.getByRole('heading', { name: 'Login' }).first(),
  usernameInput: (page) => page.locator('input[name="username"]').first(),
  passwordInput: (page) => page.locator('input[name="password"]').first(),
  loginButton: (page) => page.locator('button[type="submit"]').first(),
  forgotPasswordLink: (page) => page.locator('p.orangehrm-login-forgot-header').first(),
  usernameHint: (page) => page.getByText('Username : Admin', { exact: true }).first(),
  orangeHRMLogo: (page) => page.locator('.orangehrm-login-branding img').first()
};
module.exports = locators;