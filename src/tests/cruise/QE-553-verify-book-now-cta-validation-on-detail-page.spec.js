const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/cruise-search.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');
const CruiseBookingPage = require('../../pages/cruise-booking.page');

test.describe('[QE-548][AC5] Verify Book Now CTA validation on detail page', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;
  let cruiseBookingPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
    cruiseBookingPage = new CruiseBookingPage(page);
  });

  test('QE-553: Validate Book Now CTA is visible above fold, displays starting price, and navigates correctly', async ({ page }) => {
    // Step 1: Navigate to cruise search results
    await cruiseSearchPage.navigateToSearchResults('alaska');
    await cruiseSearchPage.verifySearchResultsDisplayed();
    console.log('✓ Search results page displays');

    // Step 2: Click View Details on cruise card
    await cruiseSearchPage.clickViewDetailsOnCard(1);
    console.log('✓ Navigation to cruise detail page (Alaska Adventure Cruise)');

    // Step 3: Wait for page to fully load
    await cruiseDetailsPage.verifyPageLoaded();
    console.log('✓ Page completely loaded');

    // Step 4: Verify Book Now CTA visible above fold
    await cruiseDetailsPage.verifyBookNowAboveFold();
    console.log('✓ Book Now CTA visible without scrolling');

    // Step 5: Verify CTA displays starting price
    await cruiseDetailsPage.verifyStartingPrice('From $899');
    console.log('✓ Starting price $899 displayed on CTA');

    // Step 6: Verify Book Now CTA enabled
    await cruiseDetailsPage.verifyBookNowButton();
    console.log('✓ CTA enabled and clickable');

    // Step 7: Click Book Now CTA
    await cruiseDetailsPage.clickBookNow();
    console.log('✓ Navigation to stateroom selection');

    // Step 8: Verify navigation to stateroom selection
    await cruiseBookingPage.verifyStateroomSelectionPage();
    console.log('✓ Stateroom selection page with correct URL');

    // Step 9: Verify cruise pre-selected in booking flow
    await cruiseBookingPage.verifyCruisePreSelected('Alaska Adventure Cruise');
    console.log('✓ Selected cruise displayed and pre-populated');

    // Step 10: Verify stateroom categories displayed
    await cruiseBookingPage.verifyStateroomCategoriesWithPricing();
    console.log('✓ All categories (Interior, Oceanview, Balcony, Suite) with availability and pricing');
  });
});