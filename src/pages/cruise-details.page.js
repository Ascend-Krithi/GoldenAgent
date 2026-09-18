const loc = require('./locators/cruise-details.locators');

class CruiseDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async isCruiseDetailsContainerVisible() {
    return await loc.cruiseDetailsContainer(this.page).isVisible();
  }

  async isStateroomOptionsSectionVisible() {
    return await loc.stateroomOptionsSection(this.page).isVisible();
  }

  async isItineraryDetailsSectionVisible() {
    return await loc.itineraryDetailsSection(this.page).isVisible();
  }

  async getCruiseTitle() {
    return await loc.cruiseTitle(this.page).textContent();
  }
}

module.exports = CruiseDetailsPage;