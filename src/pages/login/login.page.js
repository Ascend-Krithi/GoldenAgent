const loc = require('./locators/login.locators');
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  }

  async isLoginHeadingVisible() {
    try {
      await loc.loginHeading(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await loc.loginHeading(this.page).isVisible();
    } catch {
      return false;
    }
  }

  async isUsernameFieldVisible() {
    try {
      await loc.usernameInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await loc.usernameInput(this.page).isVisible();
    } catch {
      return false;
    }
  }

  async isPasswordFieldVisible() {
    try {
      await loc.passwordInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await loc.passwordInput(this.page).isVisible();
    } catch {
      return false;
    }
  }

  async isLoginButtonVisible() {
    try {
      await loc.loginButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await loc.loginButton(this.page).isVisible();
    } catch {
      return false;
    }
  }

  async isUsernameFieldEnabled() {
    return await loc.usernameInput(this.page).isEnabled();
  }

  async isPasswordFieldEnabled() {
    return await loc.passwordInput(this.page).isEnabled();
  }

  async isLoginButtonEnabled() {
    return await loc.loginButton(this.page).isEnabled();
  }

  async enterUsername(username) {
    await loc.usernameInput(this.page).fill(username);
    return true;
  }

  async enterPassword(password) {
    await loc.passwordInput(this.page).fill(password);
    return true;
  }

  async clickLoginButton() {
    await loc.loginButton(this.page).click();
    return true;
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    return true;
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = LoginPage;