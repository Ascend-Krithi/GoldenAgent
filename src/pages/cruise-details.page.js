const { expect } = require('@playwright/test');
const locators = require('./locators/cruise-details.locators');

class CruiseDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async verifyPageLoaded() {
    await expect(this.page.locator(locators.detailsPageContainer)).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUrlPattern(pattern) {
    await expect(this.page).toHaveURL(new RegExp(pattern));
  }

  async verifyDeckPlansSection() {
    await expect(this.page.locator(locators.deckPlansSection)).toBeVisible();
  }

  async verifyStateroomCategories() {
    await expect(this.page.locator(locators.interiorCategory)).toBeVisible();
    await expect(this.page.locator(locators.oceanviewCategory)).toBeVisible();
    await expect(this.page.locator(locators.balconyCategory)).toBeVisible();
    await expect(this.page.locator(locators.suiteCategory)).toBeVisible();
  }

  async verifyDailyItinerary() {
    await expect(this.page.locator(locators.dailyItinerary)).toBeVisible();
  }

  async verifyPorts() {
    await expect(this.page.locator(locators.portJuneau)).toBeVisible();
    await expect(this.page.locator(locators.portSkagway)).toBeVisible();
    await expect(this.page.locator(locators.portKetchikan)).toBeVisible();
    await expect(this.page.locator(locators.portGlacierBay)).toBeVisible();
  }

  async verifyAmenitiesList() {
    await expect(this.page.locator(locators.amenitiesList)).toBeVisible();
  }

  async verifyDiningOptions() {
    await expect(this.page.locator(locators.diningOptions)).toBeVisible();
  }

  async verifyBookNowButton() {
    const bookNowBtn = this.page.locator(locators.bookNowButton);
    await expect(bookNowBtn).toBeVisible();
    await expect(bookNowBtn).toBeEnabled();
  }

  async verifyBookNowAboveFold() {
    const bookNowBtn = this.page.locator(locators.bookNowButton);
    await expect(bookNowBtn).toBeInViewport();
  }

  async verifyStartingPrice(price) {
    const bookNowBtn = this.page.locator(locators.bookNowButton);
    await expect(bookNowBtn).toContainText(price);
  }

  async clickBookNow() {
    await this.page.locator(locators.bookNowButton).click();
  }

  async clickBack() {
    await this.page.locator(locators.backButton).click();
  }

  async verifyLoadingIndicator() {
    await expect(this.page.locator(locators.loadingIndicator)).toBeVisible();
  }

  async verifyLoadingIndicatorGone() {
    await expect(this.page.locator(locators.loadingIndicator)).toBeHidden();
  }

  async verifyErrorMessage(message) {
    const errorMsg = this.page.locator(locators.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(message);
  }

  async verifyRetryButton() {
    await expect(this.page.locator(locators.retryButton)).toBeVisible();
    await expect(this.page.locator(locators.retryButton)).toBeEnabled();
  }

  async verifyBackToSearchLink() {
    await expect(this.page.locator(locators.backToSearchLink)).toBeVisible();
    await expect(this.page.locator(locators.backToSearchLink)).toBeEnabled();
  }

  async clickRetry() {
    await this.page.locator(locators.retryButton).click();
  }

  async clickBackToSearch() {
    await this.page.locator(locators.backToSearchLink).click();
  }

  async verifyNoBrokenContent() {
    const detailsContainer = this.page.locator(locators.detailsPageContainer);
    await expect(detailsContainer).not.toBeVisible();
  }
}

module.exports = CruiseDetailsPage;