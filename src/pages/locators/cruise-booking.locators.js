// Cruise Booking Page Locators
// NOTE: These locators need to be verified against the actual cruise application

module.exports = {
  // Stateroom Selection
  stateroomSelectionPage: '.stateroom-selection-page',
  selectedCruiseName: '.selected-cruise-name',
  stateroomCategoryList: '.stateroom-category-list',
  
  // Categories with pricing
  interiorOption: '[data-stateroom="interior"]',
  oceanviewOption: '[data-stateroom="oceanview"]',
  balconyOption: '[data-stateroom="balcony"]',
  suiteOption: '[data-stateroom="suite"]',
  
  // Pricing
  startingPrice: '.starting-price',
  categoryPrice: '.category-price'
};