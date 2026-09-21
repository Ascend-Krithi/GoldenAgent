// Cruise Details Page Locators
// NOTE: These locators need to be verified against the actual cruise application

module.exports = {
  // Page Elements
  detailsPageContainer: '.cruise-details-page',
  deckPlansSection: '[data-section="deck-plans"]',
  stateroomCategories: '.stateroom-categories',
  dailyItinerary: '[data-section="itinerary"]',
  amenitiesList: '[data-section="amenities"]',
  diningOptions: '[data-section="dining"]',
  
  // Stateroom Categories
  interiorCategory: '[data-category="interior"]',
  oceanviewCategory: '[data-category="oceanview"]',
  balconyCategory: '[data-category="balcony"]',
  suiteCategory: '[data-category="suite"]',
  
  // Ports
  portJuneau: '[data-port="juneau"]',
  portSkagway: '[data-port="skagway"]',
  portKetchikan: '[data-port="ketchikan"]',
  portGlacierBay: '[data-port="glacier-bay"]',
  
  // CTAs
  bookNowButton: 'button:has-text("Book Now")',
  backButton: 'button:has-text("Back")',
  
  // Loading and Error
  loadingIndicator: '.loading-spinner',
  errorMessage: '.error-message',
  retryButton: 'button:has-text("Retry")',
  backToSearchLink: 'a:has-text("Back to Search Results")'
};