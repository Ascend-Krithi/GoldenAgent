const locators = {
  loginHeading: (page) => page.getByRole('heading', { name: 'Login' }),
  usernameInput: (page) => page.locator('input[name="username"]'),
  passwordInput: (page) => page.locator('input[name="password"]'),
  loginButton: (page) => page.locator('button[type="submit"]'),
  loginButtonByRole: (page) => page.getByRole('button', { name: 'Login' }),
  forgotPasswordLink: (page) => page.locator('p.orangehrm-login-forgot-header'),
  demoUsernameHint: (page) => page.getByText('Username : Admin', { exact: true }),
};

module.exports = locators;