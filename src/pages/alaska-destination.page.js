const loc = require('./locators/alaska-destination.locators');
const URL = 'https://www.princess.com/en-int/cruise-destinations/alaska-cruises';

class AlaskaDestinationPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isHeroBannerVisible() {
    try {
      return await loc.heroBanner(this.page).isVisible({ timeout: 10000 });
    } catch {
      return false;
    }
  }

  async isHeroHeadingVisible() {
    return await loc.heroHeading(this.page).isVisible();
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

  async acceptCookieConsent() {
    const isVisible = await this.isCookieConsentBannerVisible();
    if (isVisible) {
      await loc.cookieAcceptButton(this.page).click();
      await loc.cookieConsentBanner(this.page).waitFor({ state: 'hidden', timeout: 10000 });
    }
  }

  async clickBookYourVacation() {
    await loc.bookYourVacationButton(this.page).click();
  }

  async waitForHeroBannerLoad() {
    await loc.heroBanner(this.page).waitFor({ state: 'visible', timeout: 60000 });
  }
}

module.exports = AlaskaDestinationPage;