const locators = {
  stateroomOptions: (page) => page.locator('[data-testid="stateroom-options"], [class*="stateroom"], section:has-text("Stateroom")').first(),
  tripItinerary: (page) => page.locator('[data-testid="trip-itinerary"], [class*="itinerary"], section:has-text("Itinerary")').first(),
  stateroomCategories: (page) => page.locator('[class*="stateroom-category"], [class*="room-type"]'),
  itineraryDetails: (page) => page.locator('[class*="itinerary-detail"], [class*="port-detail"]'),
};

module.exports = locators;