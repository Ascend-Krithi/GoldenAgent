const loc = require('./locators/cruise-details.locators');
const SEARCH_URL = 'https://cruise-app.example.com/search';

class CruiseSearchPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(SEARCH_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async applyAlaskaFilter() {
    await loc.alaskaFilterOption(this.page).click();
    await this.page.waitForLoadState('networkidle');
  }

  async isSearchResultsDisplayed() {
    return await loc.searchResultsContainer(this.page).isVisible();
  }

  async clickViewDetailsOnFirstCruise() {
    await loc.viewDetailsButton(this.page).click();
  }
}

module.exports = CruiseSearchPage;