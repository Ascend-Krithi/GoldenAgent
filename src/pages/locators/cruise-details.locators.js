const locators = {
  cruiseDetailsContainer: (page) => page.locator('[class*="cruise-details"], [class*="itinerary-details"]').first(),
  stateroomOptionsSection: (page) => page.locator('[class*="stateroom"], [class*="cabin"]').first(),
  itineraryDetailsSection: (page) => page.locator('[class*="itinerary"], [class*="trip-details"]').first(),
  cruiseTitle: (page) => page.locator('h1, h2').first(),
};

module.exports = locators;