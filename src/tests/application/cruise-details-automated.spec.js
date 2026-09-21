const { test, expect } = require('../../fixtures');
const CruiseSearchPage = require('../../pages/cruise-search.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');
const TD = require('../../data/cruise-test-data');

test.describe('QE-549: Verify cruise detail page displays complete information', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('[QE-548][AC1] Verify cruise detail page displays complete information', async ({ page }) => {
    // Step 1: Navigate to cruise search results page with Alaska filter
    await cruiseSearchPage.goto();
    await cruiseSearchPage.applyAlaskaFilter();
    
    const searchResultsVisible = await cruiseSearchPage.isSearchResultsDisplayed();
    expect(searchResultsVisible).toBeTruthy();

    // Step 2: Click View Details CTA button on cruise card
    await cruiseSearchPage.clickViewDetailsOnFirstCruise();
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Verify Cruise Details page loads with correct URL
    const currentUrl = await cruiseDetailsPage.getCurrentUrl();
    expect(currentUrl).toContain(TD.urls.detailsPagePattern);

    // Step 4: Verify Deck plans section displayed
    const deckPlansVisible = await cruiseDetailsPage.isDeckPlansSectionVisible();
    expect(deckPlansVisible).toBeTruthy();

    // Step 5: Verify Stateroom categories with pricing
    const interiorVisible = await cruiseDetailsPage.isStateroomInteriorVisible();
    expect(interiorVisible).toBeTruthy();

    const oceanviewVisible = await cruiseDetailsPage.isStateroomOceanviewVisible();
    expect(oceanviewVisible).toBeTruthy();

    const balconyVisible = await cruiseDetailsPage.isStateroomBalconyVisible();
    expect(balconyVisible).toBeTruthy();

    const suiteVisible = await cruiseDetailsPage.isStateroomSuiteVisible();
    expect(suiteVisible).toBeTruthy();

    // Step 6: Verify Daily itinerary with ports
    const itineraryVisible = await cruiseDetailsPage.isDailyItineraryVisible();
    expect(itineraryVisible).toBeTruthy();

    const juneauVisible = await cruiseDetailsPage.isPortJuneauVisible();
    expect(juneauVisible).toBeTruthy();

    const skagwayVisible = await cruiseDetailsPage.isPortSkagwayVisible();
    expect(skagwayVisible).toBeTruthy();

    const ketchikanVisible = await cruiseDetailsPage.isPortKetchikanVisible();
    expect(ketchikanVisible).toBeTruthy();

    const glacierBayVisible = await cruiseDetailsPage.isPortGlacierBayVisible();
    expect(glacierBayVisible).toBeTruthy();

    // Step 7: Verify Included amenities list
    const amenitiesVisible = await cruiseDetailsPage.isIncludedAmenitiesSectionVisible();
    expect(amenitiesVisible).toBeTruthy();

    // Step 8: Verify Dining options section
    const diningVisible = await cruiseDetailsPage.isDiningOptionsSectionVisible();
    expect(diningVisible).toBeTruthy();

    // Step 9: Verify Book Now CTA displayed and enabled
    const bookNowVisible = await cruiseDetailsPage.isBookNowButtonVisible();
    expect(bookNowVisible).toBeTruthy();

    const bookNowEnabled = await cruiseDetailsPage.isBookNowButtonEnabled();
    expect(bookNowEnabled).toBeTruthy();
  });
});