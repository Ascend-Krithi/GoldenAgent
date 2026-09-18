const locators = {
  searchResultsContainer: (page) => page.locator('.cruise-search-results, [class*="search-results"]').first(),
  searchFilterBar: (page) => page.locator('.search-filter-bar, [class*="filter-bar"]').first(),
  destinationFilter: (page) => page.locator('button[data-filter="destination"]').first(),
  alaskaFilterTag: (page) => page.getByText('Alaska', { exact: true }).first(),
  datesFilter: (page) => page.locator('button[data-filter="dates"]').first(),
  departurePortsFilter: (page) => page.locator('button[data-filter="ports"]').first(),
  guestsFilter: (page) => page.locator('button[data-filter="guests"]').first(),
  cruiseCards: (page) => page.locator('article[class*="cruise-card"]'),
  firstCruiseCard: (page) => page.locator('article[class*="cruise-card"]').first(),
  cruiseCardTitle: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('h3, h2, [class*="title"]').first(),
  cruiseCardDuration: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('[class*="duration"], [class*="nights"]').first(),
  cruiseCardPrice: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('[class*="price"]').first(),
  cruiseCardCTA: (page, index = 0) => page.locator('article[class*="cruise-card"]').nth(index).locator('a:has-text("CRUISE DETAILS"), a:has-text("VIEW CRUISE")').first(),
  noResultsMessage: (page) => page.locator('[class*="no-results"], [class*="empty-state"]').first(),
};

module.exports = locators;