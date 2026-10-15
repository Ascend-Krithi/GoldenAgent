const loc = require('./locators/login.locators');
const TD = require('../data/orangehrm-test-data');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.login, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isLoginHeadingVisible() {
    return await loc.loginHeading(this.page).isVisible();
  }

  async isUsernameInputVisible() {
    return await loc.usernameInput(this.page).isVisible();
  }

  async isPasswordInputVisible() {
    return await loc.passwordInput(this.page).isVisible();
  }

  async isLoginButtonVisible() {
    return await loc.loginButton(this.page).isVisible();
  }

  async isLoginButtonEnabled() {
    return await loc.loginButton(this.page).isEnabled();
  }

  async isOrangeHRMLogoVisible() {
    const logoCount = await loc.orangeHRMLogo(this.page).count();
    return logoCount > 0;
  }

  async enterUsername(username) {
    await loc.usernameInput(this.page).fill(username);
  }

  async enterPassword(password) {
    await loc.passwordInput(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getUsernameValue() {
    return await loc.usernameInput(this.page).inputValue();
  }

  async getPasswordInputType() {
    return await loc.passwordInput(this.page).getAttribute('type');
  }

  async getLoginButtonText() {
    return await loc.loginButton(this.page).textContent();
  }
}

module.exports = LoginPage;