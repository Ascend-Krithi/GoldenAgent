const locators = {
  heroBanner: (page) => page.locator('section[class*="hero"], div[class*="banner"]').first(),
  bookYourVacationButton: (page) => page.locator('a:has-text("BOOK YOUR VACATION"), button:has-text("BOOK YOUR VACATION")').first(),
  cookieBanner: (page) => page.locator('#onetrust-banner-sdk, div[class*="cookie-banner"]').first(),
  cookieAcceptButton: (page) => page.locator('#onetrust-accept-btn-handler').first(),
  pageHeadline: (page) => page.locator('h1, h2').first(),
  searchHeader: (page) => page.locator('section[class*="search-header"], div[class*="filter-section"]').first(),
  destinationFilter: (page) => page.locator('select[name="destination"], input[name="destination"]').first(),
  departurePortsFilter: (page) => page.locator('select[name="departure-port"], input[name="port"]').first(),
  datesFilter: (page) => page.locator('input[type="date"]').first(),
  guestsFilter: (page) => page.locator('select[name="guests"], input[name="guests"]').first(),
  resultsGrid: (page) => page.locator('div[class*="results-grid"], section[class*="cruise-results"]').first(),
  cruiseCard: (page) => page.locator('article[class*="cruise-card"]'),
  firstCruiseCard: (page) => page.locator('article[class*="cruise-card"]').first(),
  cruiseCardTitle: (page) => page.locator('article[class*="cruise-card"] h2, article[class*="cruise-card"] h3, article[class*="cruise-card"] div[class*="title"]'),
  cruiseCardDuration: (page) => page.locator('article[class*="cruise-card"] span[class*="duration"], article[class*="cruise-card"] div:has-text("nights"), article[class*="cruise-card"] div:has-text("days")'),
  cruiseCardPrice: (page) => page.locator('article[class*="cruise-card"] span[class*="price"], article[class*="cruise-card"] div[class*="starting-price"]'),
  cruiseDetailsButton: (page) => page.locator('a:has-text("CRUISE DETAILS"), button:has-text("VIEW CRUISE")').first(),
  stateroomSection: (page) => page.locator('div[class*="stateroom"], section[class*="cabin-options"]').first(),
  itinerarySection: (page) => page.locator('div[class*="itinerary"], section[class*="schedule"]').first(),
  noResultsMessage: (page) => page.locator('div[class*="no-results"], p:has-text("No cruises found")').first(),
  errorMessage: (page) => page.locator('div[class*="error"]').first(),
  paginationControls: (page) => page.locator('div[class*="pagination"], nav[class*="pagination"]').first(),
  nextPageButton: (page) => page.locator('button:has-text("Next"), a[class*="next"]').first(),
  resultsCount: (page) => page.locator('div[class*="results-count"], span[class*="count"]').first()
};

module.exports = locators;