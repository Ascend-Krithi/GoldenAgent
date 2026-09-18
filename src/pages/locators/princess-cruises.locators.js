module.exports = {
  alaskaLandingPage: {
    heroBanner: '[class*="hero-banner"], .hero-section, [data-testid="hero-banner"]',
    bookYourVacationBtn: 'a:has-text("BOOK YOUR VACATION"), button:has-text("BOOK YOUR VACATION"), [data-testid="book-vacation-cta"]',
    pageTitle: 'h1',
    mainContent: 'main, [role="main"]'
  },
  cookieConsent: {
    banner: '#onetrust-banner-sdk, [class*="cookie-banner"]',
    acceptBtn: '#onetrust-accept-btn-handler, button:has-text("I Acknowledge")',
    closeBtn: '.onetrust-close-btn-handler, [aria-label="Close"]'
  },
  searchResultsPage: {
    destinationFilter: '[data-filter="destination"], select[name="destination"], [aria-label*="Destination"]',
    departurePortsFilter: '[data-filter="departure-port"], select[name="departure-port"], [aria-label*="Departure"]',
    datesFilter: '[data-filter="dates"], [name="dates"], [aria-label*="Date"]',
    guestsFilter: '[data-filter="guests"], select[name="guests"], [aria-label*="Guest"]',
    cruiseCard: 'article[class*="cruise-card"], div[class*="cruise-card"], [data-testid="cruise-card"]',
    cruiseCardTitle: '[class*="cruise-title"], h2, h3, [data-testid="cruise-title"]',
    cruiseCardDuration: '[class*="duration"], [data-testid="cruise-duration"]',
    cruiseCardPrice: '[class*="price"], [data-testid="cruise-price"]',
    cruiseCardCTA: 'a:has-text("CRUISE DETAILS"), a:has-text("VIEW CRUISE"), button:has-text("CRUISE DETAILS"), button:has-text("VIEW CRUISE")',
    noResultsMessage: '[class*="no-results"], .empty-state, [data-testid="no-results"]',
    resultsGrid: '[class*="results-grid"], [class*="cruise-list"], [data-testid="results-grid"]',
    loadingIndicator: '[class*="loading"], .spinner, [data-testid="loading"]'
  },
  cruiseDetailsPage: {
    stateroomOptions: '[class*="stateroom"], [data-testid="stateroom-options"]',
    itineraryDetails: '[class*="itinerary"], [data-testid="itinerary-details"]',
    pageTitle: 'h1',
    bookingSection: '[class*="booking"], [data-testid="booking-section"]'
  }
};