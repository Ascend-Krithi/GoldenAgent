const locators = require('./locators/princess-cruises.locators');

class PrincessCruisesPage {
  constructor(page) {
    this.page = page;
    this.locators = locators;
  }

  async navigateToAlaskaLandingPage() {
    await this.page.goto('https://www.princess.com/en-int/cruise-destinations/alaska-cruises', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async navigateToSearchResults(tradeParam = 'A') {
    const url = tradeParam ? `https://www.princess.com/cruise-search/results/?trade=${tradeParam}` : 'https://www.princess.com/cruise-search/results/';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async isHeroBannerVisible() {
    const heroBanner = this.page.locator(this.locators.alaskaLandingPage.heroBanner).first();
    await heroBanner.waitFor({ state: 'visible', timeout: 10000 });
    return await heroBanner.isVisible();
  }

  async isBookYourVacationButtonVisible() {
    const button = this.page.locator(this.locators.alaskaLandingPage.bookYourVacationBtn).first();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    return await button.isVisible();
  }

  async clickBookYourVacationButton() {
    const button = this.page.locator(this.locators.alaskaLandingPage.bookYourVacationBtn).first();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async isCookieConsentBannerVisible() {
    try {
      const banner = this.page.locator(this.locators.cookieConsent.banner).first();
      return await banner.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async acceptCookieConsent() {
    try {
      const acceptBtn = this.page.locator(this.locators.cookieConsent.acceptBtn).first();
      if (await acceptBtn.isVisible({ timeout: 5000 })) {
        await acceptBtn.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log('Cookie consent banner not found or already dismissed');
    }
  }

  async dismissCookieConsent() {
    await this.acceptCookieConsent();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async verifyUrlContainsParameter(paramName, paramValue) {
    const url = new URL(this.page.url());
    const actualValue = url.searchParams.get(paramName);
    return actualValue === paramValue;
  }

  async isDestinationFilterVisible() {
    const filter = this.page.locator(this.locators.searchResultsPage.destinationFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    return await filter.isVisible();
  }

  async isDeparturePortsFilterVisible() {
    const filter = this.page.locator(this.locators.searchResultsPage.departurePortsFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    return await filter.isVisible();
  }

  async isDatesFilterVisible() {
    const filter = this.page.locator(this.locators.searchResultsPage.datesFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    return await filter.isVisible();
  }

  async isGuestsFilterVisible() {
    const filter = this.page.locator(this.locators.searchResultsPage.guestsFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    return await filter.isVisible();
  }

  async getCruiseCardCount() {
    await this.page.waitForTimeout(2000);
    const cards = this.page.locator(this.locators.searchResultsPage.cruiseCard);
    return await cards.count();
  }

  async isCruiseCardDisplayed() {
    const card = this.page.locator(this.locators.searchResultsPage.cruiseCard).first();
    await card.waitFor({ state: 'visible', timeout: 10000 });
    return await card.isVisible();
  }

  async getFirstCruiseCard() {
    return this.page.locator(this.locators.searchResultsPage.cruiseCard).first();
  }

  async verifyCruiseCardHasTitle(cardIndex = 0) {
    const card = this.page.locator(this.locators.searchResultsPage.cruiseCard).nth(cardIndex);
    const title = card.locator(this.locators.searchResultsPage.cruiseCardTitle).first();
    await title.waitFor({ state: 'visible', timeout: 5000 });
    const text = await title.textContent();
    return text && text.trim().length > 0;
  }

  async verifyCruiseCardHasDuration(cardIndex = 0) {
    const card = this.page.locator(this.locators.searchResultsPage.cruiseCard).nth(cardIndex);
    const duration = card.locator(this.locators.searchResultsPage.cruiseCardDuration).first();
    await duration.waitFor({ state: 'visible', timeout: 5000 });
    const text = await duration.textContent();
    return text && text.trim().length > 0;
  }

  async verifyCruiseCardHasPrice(cardIndex = 0) {
    const card = this.page.locator(this.locators.searchResultsPage.cruiseCard).nth(cardIndex);
    const price = card.locator(this.locators.searchResultsPage.cruiseCardPrice).first();
    await price.waitFor({ state: 'visible', timeout: 5000 });
    const text = await price.textContent();
    return text && text.trim().length > 0;
  }

  async verifyCruiseCardHasCTA(cardIndex = 0) {
    const card = this.page.locator(this.locators.searchResultsPage.cruiseCard).nth(cardIndex);
    const cta = card.locator(this.locators.searchResultsPage.cruiseCardCTA).first();
    await cta.waitFor({ state: 'visible', timeout: 5000 });
    return await cta.isVisible();
  }

  async clickCruiseCardCTA(cardIndex = 0) {
    const card = this.page.locator(this.locators.searchResultsPage.cruiseCard).nth(cardIndex);
    const cta = card.locator(this.locators.searchResultsPage.cruiseCardCTA).first();
    await cta.waitFor({ state: 'visible', timeout: 10000 });
    await cta.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async isStateroomOptionsVisible() {
    const staterooms = this.page.locator(this.locators.cruiseDetailsPage.stateroomOptions).first();
    await staterooms.waitFor({ state: 'visible', timeout: 10000 });
    return await staterooms.isVisible();
  }

  async isItineraryDetailsVisible() {
    const itinerary = this.page.locator(this.locators.cruiseDetailsPage.itineraryDetails).first();
    await itinerary.waitFor({ state: 'visible', timeout: 10000 });
    return await itinerary.isVisible();
  }

  async isNoResultsMessageVisible() {
    try {
      const message = this.page.locator(this.locators.searchResultsPage.noResultsMessage).first();
      return await message.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async navigateBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  async getFocusedElement() {
    return await this.page.evaluate(() => document.activeElement.tagName);
  }

  async applyDeparturePortFilter(port) {
    const filter = this.page.locator(this.locators.searchResultsPage.departurePortsFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    await filter.click();
    await this.page.waitForTimeout(1000);
  }

  async applyDatesFilter(startDate, endDate) {
    const filter = this.page.locator(this.locators.searchResultsPage.datesFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    await filter.click();
    await this.page.waitForTimeout(1000);
  }

  async applyGuestsFilter(guests) {
    const filter = this.page.locator(this.locators.searchResultsPage.guestsFilter).first();
    await filter.waitFor({ state: 'visible', timeout: 10000 });
    await filter.click();
    await this.page.waitForTimeout(1000);
  }
}

module.exports = PrincessCruisesPage;