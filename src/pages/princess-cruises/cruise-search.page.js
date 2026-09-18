const loc = require('./locators/cruise-search.locators');
const TD = require('../../data/princess-cruises-test-data');

class CruiseSearchPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.cruiseSearchResults, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async gotoWithTradeParameter(trade) {
    await this.page.goto(`${TD.urls.cruiseSearchResults}?trade=${trade}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async isDestinationFilterVisible() {
    return await loc.destinationFilter(this.page).isVisible();
  }

  async isDeparturePortsFilterVisible() {
    return await loc.departurePortsFilter(this.page).isVisible();
  }

  async isDatesFilterVisible() {
    return await loc.datesFilter(this.page).isVisible();
  }

  async isGuestsFilterVisible() {
    return await loc.guestsFilter(this.page).isVisible();
  }

  async getCruiseCardCount() {
    return await loc.cruiseCards(this.page).count();
  }

  async isAlaskaDestinationSelected() {
    try {
      return await loc.alaskaDestinationSelected(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isCruiseCardTitleVisible(cardIndex = 0) {
    return await loc.cruiseCardTitle(this.page, cardIndex).isVisible();
  }

  async isCruiseCardDurationVisible(cardIndex = 0) {
    return await loc.cruiseCardDuration(this.page, cardIndex).isVisible();
  }

  async isCruiseCardPriceVisible(cardIndex = 0) {
    return await loc.cruiseCardPrice(this.page, cardIndex).isVisible();
  }

  async isCruiseCardCTAVisible(cardIndex = 0) {
    return await loc.cruiseCardCTA(this.page, cardIndex).isVisible();
  }

  async getCruiseCardTitleText(cardIndex = 0) {
    return await loc.cruiseCardTitle(this.page, cardIndex).textContent();
  }

  async getCruiseCardDurationText(cardIndex = 0) {
    return await loc.cruiseCardDuration(this.page, cardIndex).textContent();
  }

  async getCruiseCardPriceText(cardIndex = 0) {
    return await loc.cruiseCardPrice(this.page, cardIndex).textContent();
  }

  async clickCruiseCardCTA(cardIndex = 0) {
    await loc.cruiseCardCTA(this.page, cardIndex).click();
  }

  getDestinationFilter() {
    return loc.destinationFilter(this.page);
  }

  getDeparturePortsFilter() {
    return loc.departurePortsFilter(this.page);
  }

  getDatesFilter() {
    return loc.datesFilter(this.page);
  }

  getGuestsFilter() {
    return loc.guestsFilter(this.page);
  }

  getFirstCruiseCard() {
    return loc.firstCruiseCard(this.page);
  }
}

module.exports = CruiseSearchPage;