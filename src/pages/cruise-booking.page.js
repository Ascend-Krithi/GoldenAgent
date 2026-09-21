const { expect } = require('@playwright/test');
const locators = require('./locators/cruise-booking.locators');

class CruiseBookingPage {
  constructor(page) {
    this.page = page;
  }

  async verifyStateroomSelectionPage() {
    await expect(this.page.locator(locators.stateroomSelectionPage)).toBeVisible();
    await expect(this.page).toHaveURL(/\/booking\/stateroom-selection/);
  }

  async verifyCruisePreSelected(cruiseName) {
    const selectedCruise = this.page.locator(locators.selectedCruiseName);
    await expect(selectedCruise).toBeVisible();
    await expect(selectedCruise).toContainText(cruiseName);
  }

  async verifyStateroomCategories() {
    await expect(this.page.locator(locators.interiorOption)).toBeVisible();
    await expect(this.page.locator(locators.oceanviewOption)).toBeVisible();
    await expect(this.page.locator(locators.balconyOption)).toBeVisible();
    await expect(this.page.locator(locators.suiteOption)).toBeVisible();
  }

  async verifyStateroomCategoriesWithPricing() {
    const categories = [locators.interiorOption, locators.oceanviewOption, locators.balconyOption, locators.suiteOption];
    
    for (const category of categories) {
      const categoryElement = this.page.locator(category);
      await expect(categoryElement).toBeVisible();
      await expect(categoryElement.locator(locators.categoryPrice)).toBeVisible();
    }
  }
}

module.exports = CruiseBookingPage;