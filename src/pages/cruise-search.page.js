const { expect } = require('@playwright/test');
const locators = require('./locators/cruise-search.locators');

class CruiseSearchPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSearchResults(destination = 'alaska') {
    await this.page.goto(`/cruises/search?destination=${destination}`);
    await this.page.waitForLoadState('networkidle');
  }

  async applyAlaskaFilter() {
    await this.page.locator(locators.alaskaFilter).click();
    await this.page.waitForLoadState('networkidle');
  }

  async applyDateFilter(date) {
    await this.page.locator(locators.dateFilter).click();
    await this.page.locator(`[data-date="${date}"]`).click();
  }

  async applyPriceFilter(minPrice, maxPrice) {
    await this.page.locator(locators.priceFilter).click();
    await this.page.locator(`[data-min="${minPrice}"]`).fill(minPrice.toString());
    await this.page.locator(`[data-max="${maxPrice}"]`).fill(maxPrice.toString());
  }

  async scrollToCruiseCard(cardIndex) {
    const card = this.page.locator(locators.cruiseCard).nth(cardIndex - 1);
    await card.scrollIntoViewIfNeeded();
    return card;
  }

  async clickViewDetailsOnCard(cardIndex) {
    const card = await this.scrollToCruiseCard(cardIndex);
    await card.locator(locators.viewDetailsButton).click();
  }

  async verifySearchResultsDisplayed() {
    await expect(this.page.locator(locators.searchResultsContainer)).toBeVisible();
  }

  async verifyAlaskaFilterActive() {
    await expect(this.page.locator(locators.alaskaFilter)).toHaveClass(/active|selected/);
  }

  async verifyDateFilterActive(date) {
    const dateFilterElement = this.page.locator(locators.dateFilter);
    await expect(dateFilterElement).toContainText(date);
  }

  async verifyPriceFilterActive(range) {
    const priceFilterElement = this.page.locator(locators.priceFilter);
    await expect(priceFilterElement).toContainText(range);
  }

  async verifyCruiseCardInViewport(cardIndex) {
    const card = this.page.locator(locators.cruiseCard).nth(cardIndex - 1);
    await expect(card).toBeInViewport();
  }
}

module.exports = CruiseSearchPage;