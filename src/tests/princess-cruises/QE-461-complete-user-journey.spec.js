const { test, expect } = require('../../fixtures');
const AlaskaLandingPage = require('../../pages/princess-cruises/alaska-landing.page');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const CruiseDetailsPage = require('../../pages/princess-cruises/cruise-details.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-461] Verify complete user journey from Alaska landing page to Cruise Details page', () => {
  let alaskaLandingPage;
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    alaskaLandingPage = new AlaskaLandingPage(page);
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('[QE-461] TS-010: Verify complete end-to-end user journey from Alaska destination landing page through to Cruise Details page', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await alaskaLandingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.alaskaLanding);

    // Assert - Alaska landing page loads with hero banner and 'BOOK YOUR VACATION' button
    await expect(alaskaLandingPage.getHeroBanner()).toBeVisible();
    await expect(alaskaLandingPage.getBookYourVacationButton()).toBeVisible();

    // Act - Dismiss cookie consent if present
    await alaskaLandingPage.dismissCookieConsent();

    // Step 2: Click 'BOOK YOUR VACATION' button
    await alaskaLandingPage.clickBookYourVacationButton();

    // Assert - User is redirected to search results page with trade=A parameter
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade);
    expect(page.url()).toContain('trade=A');

    // Step 3: Verify search results page loads with Alaska filter applied
    const isAlaskaSelected = await cruiseSearchPage.isAlaskaDestinationSelected();
    expect(isAlaskaSelected).toBeTruthy();

    // Assert - Cruise cards are visible
    const cruiseCardCount = await cruiseSearchPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThan(0);
    await expect(cruiseSearchPage.getFirstCruiseCard()).toBeVisible();

    // Step 4: Verify all filter controls are displayed
    await expect(cruiseSearchPage.getDestinationFilter()).toBeVisible();
    await expect(cruiseSearchPage.getDeparturePortsFilter()).toBeVisible();
    await expect(cruiseSearchPage.getDatesFilter()).toBeVisible();
    await expect(cruiseSearchPage.getGuestsFilter()).toBeVisible();

    // Step 5: Click 'CRUISE DETAILS' button on first cruise card
    await cruiseSearchPage.clickCruiseCardCTA(0);

    // Assert - User is redirected to Cruise Details page
    await expect(page).toHaveURL(TD.urlPatterns.cruiseDetails);

    // Step 6: Verify Cruise Details page displays stateroom options and itinerary
    await expect(cruiseDetailsPage.getStateroomOptions()).toBeVisible();
    await expect(cruiseDetailsPage.getTripItinerary()).toBeVisible();

    // Assert - All required information is displayed
    const isStateroomVisible = await cruiseDetailsPage.isStateroomOptionsVisible();
    const isItineraryVisible = await cruiseDetailsPage.isTripItineraryVisible();
    expect(isStateroomVisible).toBeTruthy();
    expect(isItineraryVisible).toBeTruthy();
  });
});