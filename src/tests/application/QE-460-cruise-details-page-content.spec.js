const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-460] Cruise Details Page Content', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;
  let cruiseDetailsPage;

  test('[QE-460] TS-009: Verify that Cruise Details page displays stateroom options and full trip itinerary details', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);

    // Step 1: Navigate to cruise search results page
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Click on 'CRUISE DETAILS' or 'VIEW CRUISE' button on first cruise card
    await searchResultsPage.clickCruiseCardCTA(0);
    await page.waitForURL(/.*cruise-search\/details\/.*/, { timeout: 30000 });

    // Step 3: Verify stateroom options section is displayed
    const isStateroomVisible = await cruiseDetailsPage.isStateroomOptionsSectionVisible();
    expect(isStateroomVisible).toBe(true);

    // Step 4: Verify full trip itinerary details section is displayed
    const isItineraryVisible = await cruiseDetailsPage.isItineraryDetailsSectionVisible();
    expect(isItineraryVisible).toBe(true);
  });
});