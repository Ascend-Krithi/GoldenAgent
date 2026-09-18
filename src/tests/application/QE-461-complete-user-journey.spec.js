const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-461] Complete User Journey E2E', {
  tag: ['@e2e', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;
  let searchResultsPage;
  let cruiseDetailsPage;

  test('[QE-461] TS-010: Verify complete user journey from Alaska landing page to Cruise Details page', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);
    searchResultsPage = new CruiseSearchResultsPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);
    await alaskaPage.acceptCookieConsent();

    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    const isBookButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBe(true);

    // Step 2: Click 'BOOK YOUR VACATION' button
    await alaskaPage.clickBookYourVacation();

    // Step 3: Verify search results page loads with Alaska filter applied
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    const isAlaskaFilterApplied = await searchResultsPage.isAlaskaFilterApplied();
    expect(isAlaskaFilterApplied).toBe(true);

    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(1);

    // Step 4: Verify all filter controls are displayed
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    const isDeparturePortsFilterVisible = await searchResultsPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBe(true);

    const isDatesFilterVisible = await searchResultsPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBe(true);

    const isGuestsFilterVisible = await searchResultsPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBe(true);

    // Step 5: Click 'CRUISE DETAILS' button on first cruise card
    await searchResultsPage.clickCruiseCardCTA(0);

    // Step 6: Verify Cruise Details page displays stateroom options and itinerary
    await page.waitForURL(/.*cruise-search\/details\/.*/, { timeout: 30000 });

    const isStateroomVisible = await cruiseDetailsPage.isStateroomOptionsSectionVisible();
    expect(isStateroomVisible).toBe(true);

    const isItineraryVisible = await cruiseDetailsPage.isItineraryDetailsSectionVisible();
    expect(isItineraryVisible).toBe(true);
  });
});