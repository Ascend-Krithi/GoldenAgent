const locators = {
  searchResultsContainer: (page) => page.locator('.cruise-search-results').first(),
  searchFilterBar: (page) => page.locator('.search-filter-bar').first(),
  destinationFilter: (page) => page.locator('button[data-filter="destination"]'),
  alaskaFilterTag: (page) => page.getByText('Alaska', { exact: true }),
  datesFilter: (page) => page.locator('button[data-filter="dates"]'),
  departurePortsFilter: (page) => page.locator('button[data-filter="ports"]'),
  guestsFilter: (page) => page.locator('button[data-filter="guests"]'),
  cruiseCards: (page) => page.locator('article[class*="cruise-card"]'),
  firstCruiseCard: (page) => page.locator('article[class*="cruise-card"]').first(),
  cruiseCardTitle: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('h3, h2, [class*="title"]').first(),
  cruiseCardDuration: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('[class*="duration"], [class*="nights"]').first(),
  cruiseCardPrice: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('[class*="price"]').first(),
  cruiseCardCTA: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('a:has-text("CRUISE DETAILS"), a:has-text("VIEW CRUISE")').first(),
  noResultsMessage: (page) => page.locator('[class*="no-results"], [class*="empty-state"]').first(),
};

module.exports = locators;