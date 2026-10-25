const loc = require('./locators/orangehrm-login.locators');
const testData = require('../data/orangehrm-test-data');

const URL = testData.urls.loginUrl;

class OrangeHRMLoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isLoginPageLoaded() {
    try {
      await loc.loginHeading(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await loc.usernameInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await loc.passwordInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await loc.loginButtonByRole(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async fillUsername(username) {
    await loc.usernameInput(this.page).fill(username);
  }

  async fillPassword(password) {
    await loc.passwordInput(this.page).fill(password);
  }

  async clickLoginButton() {
    await loc.loginButtonByRole(this.page).click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async loginWithValidCredentials() {
    await this.login(testData.credentials.validUsername, testData.credentials.validPassword);
  }

  async getLoginHeadingText() {
    return await loc.loginHeading(this.page).textContent();
  }

  async isForgotPasswordLinkVisible() {
    try {
      await loc.forgotPasswordLink(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = OrangeHRMLoginPage;