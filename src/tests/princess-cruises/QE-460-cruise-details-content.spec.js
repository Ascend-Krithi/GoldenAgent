const { test, expect } = require('../../fixtures');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const CruiseDetailsPage = require('../../pages/princess-cruises/cruise-details.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-460] Verify Cruise Details page displays stateroom options and itinerary', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('[QE-460] TS-009: Verify that Cruise Details page displays stateroom options and full trip itinerary details', async ({ page }) => {
    // Arrange - Navigate to cruise search results page
    await cruiseSearchPage.gotoWithTradeParameter(TD.tradeParameters.alaska);
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade, { timeout: 60000 });

    // Act - Click on 'CRUISE DETAILS' or 'VIEW CRUISE' button on first cruise card
    await expect(cruiseSearchPage.getFirstCruiseCard()).toBeVisible();
    await cruiseSearchPage.clickCruiseCardCTA(0);

    // Assert - User is redirected to Cruise Details page
    await expect(page).toHaveURL(TD.urlPatterns.cruiseDetails);

    // Assert - Verify stateroom options section is displayed
    const isStateroomVisible = await cruiseDetailsPage.isStateroomOptionsVisible();
    expect(isStateroomVisible).toBeTruthy();
    await expect(cruiseDetailsPage.getStateroomOptions()).toBeVisible();

    // Assert - Verify full trip itinerary details section is displayed
    const isItineraryVisible = await cruiseDetailsPage.isTripItineraryVisible();
    expect(isItineraryVisible).toBeTruthy();
    await expect(cruiseDetailsPage.getTripItinerary()).toBeVisible();
  });
});