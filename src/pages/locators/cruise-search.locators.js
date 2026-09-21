// Cruise Search Page Locators
// NOTE: These locators need to be verified against the actual cruise application
// OrangeHRM locators were provided but test cases are for cruise booking domain

module.exports = {
  // Search Results
  searchResultsContainer: '.cruise-search-results',
  cruiseCard: '.cruise-card',
  viewDetailsButton: 'button:has-text("View Details")',
  
  // Filters
  alaskaFilter: '[data-filter="alaska"]',
  dateFilter: '[data-filter="date"]',
  priceFilter: '[data-filter="price"]',
  filterActive: '.filter-active',
  
  // Search URL
  searchUrl: '/cruises/search?destination=alaska'
};