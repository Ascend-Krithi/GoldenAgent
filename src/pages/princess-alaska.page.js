const loc = require('./locators/princess-alaska.locators');
const ALASKA_URL = 'https://www.princess.com/en-int/cruise-destinations/alaska-cruises';
const SEARCH_RESULTS_URL = 'https://www.princess.com/cruise-search/results/';

class PrincessAlaskaPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ALASKA_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async gotoSearchResults() {
    await this.page.goto(SEARCH_RESULTS_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async gotoSearchResultsWithTrade(tradeParam) {
    await this.page.goto(`${SEARCH_RESULTS_URL}?trade=${tradeParam}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isHeroBannerVisible() {
    return await loc.heroBanner(this.page).isVisible();
  }

  async isBookYourVacationButtonVisible() {
    return await loc.bookYourVacationButton(this.page).isVisible();
  }

  async isCookieBannerVisible() {
    try {
      return await loc.cookieBanner(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async dismissCookieBanner() {
    const isVisible = await this.isCookieBannerVisible();
    if (isVisible) {
      await loc.cookieAcceptButton(this.page).click();
      await loc.cookieBanner(this.page).waitFor({ state: 'hidden', timeout: 10000 });
    }
    return true;
  }

  async clickBookYourVacationButton() {
    await loc.bookYourVacationButton(this.page).click();
  }

  async getPageHeadlineText() {
    return await loc.pageHeadline(this.page).textContent();
  }

  async isSearchHeaderVisible() {
    return await loc.searchHeader(this.page).isVisible();
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

  async isResultsGridVisible() {
    return await loc.resultsGrid(this.page).isVisible();
  }

  async getCruiseCardCount() {
    return await loc.cruiseCard(this.page).count();
  }

  async isAtLeastOneCruiseCardVisible() {
    const count = await this.getCruiseCardCount();
    return count > 0;
  }

  async getFirstCruiseCardTitle() {
    return await loc.cruiseCardTitle(this.page).first().textContent();
  }

  async isFirstCruiseCardTitleVisible() {
    return await loc.cruiseCardTitle(this.page).first().isVisible();
  }

  async isFirstCruiseCardDurationVisible() {
    return await loc.cruiseCardDuration(this.page).first().isVisible();
  }

  async isFirstCruiseCardPriceVisible() {
    return await loc.cruiseCardPrice(this.page).first().isVisible();
  }

  async isCruiseDetailsButtonVisible() {
    return await loc.cruiseDetailsButton(this.page).isVisible();
  }

  async clickCruiseDetailsButton() {
    await loc.cruiseDetailsButton(this.page).click();
  }

  async isStateroomSectionVisible() {
    return await loc.stateroomSection(this.page).isVisible();
  }

  async isItinerarySectionVisible() {
    return await loc.itinerarySection(this.page).isVisible();
  }

  async isNoResultsMessageVisible() {
    try {
      return await loc.noResultsMessage(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isErrorMessageVisible() {
    try {
      return await loc.errorMessage(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async waitForURL(urlPattern, timeout = 30000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  async isPaginationVisible() {
    try {
      return await loc.paginationControls(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async clickNextPage() {
    await loc.nextPageButton(this.page).click();
  }

  async getResultsCountText() {
    try {
      return await loc.resultsCount(this.page).textContent();
    } catch {
      return '';
    }
  }

  async getDestinationFilterValue() {
    return await loc.destinationFilter(this.page).inputValue();
  }
}

module.exports = PrincessAlaskaPage;