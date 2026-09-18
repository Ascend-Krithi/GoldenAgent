const loc = require('./locators/cruise-search-results.locators');
const URL = 'https://www.princess.com/cruise-search/results/';

class CruiseSearchResultsPage {
  constructor(page) {
    this.page = page;
  }

  async goto(tradeParam = '') {
    const fullURL = tradeParam ? `${URL}?trade=${tradeParam}` : URL;
    await this.page.goto(fullURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isSearchResultsContainerVisible() {
    return await loc.searchResultsContainer(this.page).isVisible();
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

  async isAlaskaFilterApplied() {
    try {
      return await loc.alaskaFilterTag(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async getCruiseCardsCount() {
    return await loc.cruiseCards(this.page).count();
  }

  async isCruiseCardVisible(index = 0) {
    const count = await this.getCruiseCardsCount();
    return count > index;
  }

  async getCruiseCardTitle(index = 0) {
    return await loc.cruiseCardTitle(this.page, index).textContent();
  }

  async isCruiseCardTitleVisible(index = 0) {
    return await loc.cruiseCardTitle(this.page, index).isVisible();
  }

  async isCruiseCardDurationVisible(index = 0) {
    return await loc.cruiseCardDuration(this.page, index).isVisible();
  }

  async isCruiseCardPriceVisible(index = 0) {
    return await loc.cruiseCardPrice(this.page, index).isVisible();
  }

  async isCruiseCardCTAVisible(index = 0) {
    return await loc.cruiseCardCTA(this.page, index).isVisible();
  }

  async clickCruiseCardCTA(index = 0) {
    await loc.cruiseCardCTA(this.page, index).click();
  }

  async isNoResultsMessageVisible() {
    try {
      return await loc.noResultsMessage(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async applyDeparturePortFilter() {
    await loc.departurePortsFilter(this.page).click();
  }

  async applyDatesFilter() {
    await loc.datesFilter(this.page).click();
  }

  async applyGuestsFilter() {
    await loc.guestsFilter(this.page).click();
  }
}

module.exports = CruiseSearchResultsPage;