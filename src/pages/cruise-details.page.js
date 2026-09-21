const loc = require('./locators/cruise-details.locators');

class CruiseDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async isDeckPlansSectionVisible() {
    return await loc.deckPlansSection(this.page).isVisible();
  }

  async isStateroomInteriorVisible() {
    return await loc.stateroomInterior(this.page).isVisible();
  }

  async isStateroomOceanviewVisible() {
    return await loc.stateroomOceanview(this.page).isVisible();
  }

  async isStateroomBalconyVisible() {
    return await loc.stateroomBalcony(this.page).isVisible();
  }

  async isStateroomSuiteVisible() {
    return await loc.stateroomSuite(this.page).isVisible();
  }

  async isDailyItineraryVisible() {
    return await loc.dailyItinerarySection(this.page).isVisible();
  }

  async isPortJuneauVisible() {
    return await loc.portJuneau(this.page).isVisible();
  }

  async isPortSkagwayVisible() {
    return await loc.portSkagway(this.page).isVisible();
  }

  async isPortKetchikanVisible() {
    return await loc.portKetchikan(this.page).isVisible();
  }

  async isPortGlacierBayVisible() {
    return await loc.portGlacierBay(this.page).isVisible();
  }

  async isIncludedAmenitiesSectionVisible() {
    return await loc.includedAmenitiesSection(this.page).isVisible();
  }

  async isDiningOptionsSectionVisible() {
    return await loc.diningOptionsSection(this.page).isVisible();
  }

  async isBookNowButtonVisible() {
    return await loc.bookNowButton(this.page).isVisible();
  }

  async isBookNowButtonEnabled() {
    return await loc.bookNowButton(this.page).isEnabled();
  }
}

module.exports = CruiseDetailsPage;