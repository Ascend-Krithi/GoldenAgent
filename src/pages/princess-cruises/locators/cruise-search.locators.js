const locators = {
  destinationFilter: (page) => page.locator('[data-testid="destination-filter"], select[name*="destination"], [aria-label*="Destination"]').first(),
  departurePortsFilter: (page) => page.locator('[data-testid="departure-ports-filter"], select[name*="port"], [aria-label*="Departure"]').first(),
  datesFilter: (page) => page.locator('[data-testid="dates-filter"], input[name*="date"], [aria-label*="Date"]').first(),
  guestsFilter: (page) => page.locator('[data-testid="guests-filter"], select[name*="guest"], [aria-label*="Guest"]').first(),
  cruiseCards: (page) => page.locator('article[class*="cruise-card"], div[class*="cruise-card"], [class*="cruise-result"]'),
  firstCruiseCard: (page) => page.locator('article[class*="cruise-card"], div[class*="cruise-card"], [class*="cruise-result"]').first(),
  cruiseCardTitle: (page, cardIndex = 0) => page.locator('article[class*="cruise-card"], div[class*="cruise-card"]').nth(cardIndex).locator('[class*="title"], h2, h3').first(),
  cruiseCardDuration: (page, cardIndex = 0) => page.locator('article[class*="cruise-card"], div[class*="cruise-card"]').nth(cardIndex).locator('[class*="duration"], [class*="nights"]').first(),
  cruiseCardPrice: (page, cardIndex = 0) => page.locator('article[class*="cruise-card"], div[class*="cruise-card"]').nth(cardIndex).locator('[class*="price"], [class*="cost"]').first(),
  cruiseCardCTA: (page, cardIndex = 0) => page.locator('article[class*="cruise-card"], div[class*="cruise-card"]').nth(cardIndex).locator('a:has-text("CRUISE DETAILS"), button:has-text("VIEW CRUISE"), a:has-text("VIEW CRUISE")').first(),
  alaskaDestinationSelected: (page) => page.locator('[data-testid="destination-filter"][value*="Alaska"], [aria-label*="Destination"][value*="Alaska"], text=Alaska').first(),
};

module.exports = locators;