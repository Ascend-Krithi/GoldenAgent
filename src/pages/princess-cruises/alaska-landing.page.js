const loc = require('./locators/alaska-landing.locators');
const TD = require('../../data/princess-cruises-test-data');

class AlaskaLandingPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.alaskaLanding, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async isHeroBannerVisible() {
    return await loc.heroBanner(this.page).isVisible();
  }

  async isBookYourVacationButtonVisible() {
    return await loc.bookYourVacationButton(this.page).isVisible();
  }

  async isCookieConsentBannerVisible() {
    try {
      return await loc.cookieConsentBanner(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async dismissCookieConsent() {
    const isBannerVisible = await this.isCookieConsentBannerVisible();
    if (isBannerVisible) {
      await loc.cookieAcceptButton(this.page).click();
      await loc.cookieConsentBanner(this.page).waitFor({ state: 'hidden', timeout: 10000 });
    }
  }

  async clickBookYourVacationButton() {
    await loc.bookYourVacationButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {});
  }

  getHeroBanner() {
    return loc.heroBanner(this.page);
  }

  getBookYourVacationButton() {
    return loc.bookYourVacationButton(this.page);
  }

  getCookieConsentBanner() {
    return loc.cookieConsentBanner(this.page);
  }
}

module.exports = AlaskaLandingPage;