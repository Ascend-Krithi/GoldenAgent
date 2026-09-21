const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC4] Cruise Details Navigation Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-506] Verify clicking CRUISE DETAILS button on cruise card opens Cruise Details page with stateroom options and itinerary', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Locate CRUISE DETAILS button on the first cruise card
    const isCTAVisible = await alaskaPage.isCruiseDetailsButtonVisible();
    expect(isCTAVisible).toBe(true);

    // Step 4: Click CRUISE DETAILS button
    await alaskaPage.clickCruiseDetailsButton();

    // Step 5: Verify navigation to Cruise Details page
    await alaskaPage.waitForURL(TD.urlPatterns.cruiseDetails, TD.timeouts.navigation);

    // Step 6: Verify stateroom options section is displayed
    const isStateroomVisible = await alaskaPage.isStateroomSectionVisible();
    expect(isStateroomVisible).toBe(true);

    // Step 7: Verify itinerary information is displayed
    const isItineraryVisible = await alaskaPage.isItinerarySectionVisible();
    expect(isItineraryVisible).toBe(true);
  });
});