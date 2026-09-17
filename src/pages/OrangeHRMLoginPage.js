const loc = require('./locators/orangehrm-login.locators');
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

class OrangeHRMLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isLoginPageDisplayed() {
    await this.page.waitForLoadState('domcontentloaded');
    return await loc.loginHeading(this.page).isVisible();
  }

  async fillUsername(username) {
    await loc.usernameInput(this.page).fill(username);
  }

  async fillPassword(password) {
    await loc.passwordInput(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async isUsernameFieldVisible() {
    return await loc.usernameInput(this.page).isVisible();
  }

  async isPasswordFieldVisible() {
    return await loc.passwordInput(this.page).isVisible();
  }

  async isLoginButtonVisible() {
    return await loc.loginButton(this.page).isVisible();
  }
}

module.exports = OrangeHRMLoginPage;