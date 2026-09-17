const locators = {
  loginHeading: (page) => page.getByRole('heading', { name: 'Login' }),
  usernameInput: (page) => page.locator('input[name="username"]'),
  passwordInput: (page) => page.locator('input[name="password"]'),
  loginButton: (page) => page.locator('button[type="submit"]'),
  forgotPasswordLink: (page) => page.locator('p.orangehrm-login-forgot-header')
};

module.exports = locators;