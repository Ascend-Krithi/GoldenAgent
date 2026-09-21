const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/cruise-search.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');

test.describe('[QE-548][AC1] Verify cruise detail page displays complete information', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('QE-549: Validate cruise details page displays all required information', async ({ page }) => {
    // Step 1: Navigate to cruise search results page with Alaska filter
    await cruiseSearchPage.navigateToSearchResults('alaska');
    await cruiseSearchPage.verifySearchResultsDisplayed();
    console.log('✓ Search results page displays with Alaska cruises');

    // Step 2: Click View Details CTA button on cruise card
    await cruiseSearchPage.clickViewDetailsOnCard(1);
    console.log('✓ Navigation to Cruise Details page initiated');

    // Step 3: Verify Cruise Details page loads
    await cruiseDetailsPage.verifyPageLoaded();
    await cruiseDetailsPage.verifyUrlPattern('/cruises/alaska/cruise-');
    console.log('✓ Cruise Details page displayed with correct URL');

    // Step 4: Verify Deck plans section displayed
    await cruiseDetailsPage.verifyDeckPlansSection();
    console.log('✓ Deck plans section visible with layout');

    // Step 5: Verify Stateroom categories with pricing
    await cruiseDetailsPage.verifyStateroomCategories();
    console.log('✓ All four categories displayed with pricing');

    // Step 6: Verify Daily itinerary with ports
    await cruiseDetailsPage.verifyDailyItinerary();
    await cruiseDetailsPage.verifyPorts();
    console.log('✓ Daily itinerary visible with all ports (Juneau, Skagway, Ketchikan, Glacier Bay)');

    // Step 7: Verify Included amenities list
    await cruiseDetailsPage.verifyAmenitiesList();
    console.log('✓ Amenities list visible');

    // Step 8: Verify Dining options section
    await cruiseDetailsPage.verifyDiningOptions();
    console.log('✓ Dining options visible');

    // Step 9: Verify Book Now CTA displayed
    await cruiseDetailsPage.verifyBookNowButton();
    console.log('✓ Book Now CTA visible and enabled');
  });
});