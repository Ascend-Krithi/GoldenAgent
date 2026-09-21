const locators = {
  searchResultsContainer: (page) => page.locator('[data-testid="cruise-search-results"]').first(),
  alaskaFilterOption: (page) => page.locator('[data-testid="filter-alaska"]').first(),
  cruiseCard: (page) => page.locator('[data-testid="cruise-card"]').first(),
  viewDetailsButton: (page) => page.locator('[data-testid="view-details-btn"]').first(),
  deckPlansSection: (page) => page.locator('[data-testid="deck-plans-section"]').first(),
  stateroomInterior: (page) => page.locator('[data-testid="stateroom-interior"]').first(),
  stateroomOceanview: (page) => page.locator('[data-testid="stateroom-oceanview"]').first(),
  stateroomBalcony: (page) => page.locator('[data-testid="stateroom-balcony"]').first(),
  stateroomSuite: (page) => page.locator('[data-testid="stateroom-suite"]').first(),
  dailyItinerarySection: (page) => page.locator('[data-testid="daily-itinerary"]').first(),
  portJuneau: (page) => page.locator('[data-testid="port-juneau"]').first(),
  portSkagway: (page) => page.locator('[data-testid="port-skagway"]').first(),
  portKetchikan: (page) => page.locator('[data-testid="port-ketchikan"]').first(),
  portGlacierBay: (page) => page.locator('[data-testid="port-glacier-bay"]').first(),
  includedAmenitiesSection: (page) => page.locator('[data-testid="included-amenities"]').first(),
  diningOptionsSection: (page) => page.locator('[data-testid="dining-options"]').first(),
  bookNowButton: (page) => page.locator('[data-testid="book-now-btn"]').first()
};

module.exports = locators;