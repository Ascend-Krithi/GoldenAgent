const loc = require('./locators/cruise-details.locators');

class CruiseDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async isStateroomOptionsVisible() {
    return await loc.stateroomOptions(this.page).isVisible();
  }

  async isTripItineraryVisible() {
    return await loc.tripItinerary(this.page).isVisible();
  }

  async getStateroomCategoryCount() {
    return await loc.stateroomCategories(this.page).count();
  }

  async getItineraryDetailCount() {
    return await loc.itineraryDetails(this.page).count();
  }

  getStateroomOptions() {
    return loc.stateroomOptions(this.page);
  }

  getTripItinerary() {
    return loc.tripItinerary(this.page);
  }
}

module.exports = CruiseDetailsPage;