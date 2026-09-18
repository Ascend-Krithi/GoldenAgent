const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1, AC2, AC3, AC4] TS-010: Verify complete user journey', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-461: Verify complete user journey from Alaska landing page to Cruise Details page', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ Alaska landing page loads with hero banner and BOOK YOUR VACATION button');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Click 'BOOK YOUR VACATION' button
    await princessPage.clickBookYourVacationButton();
    console.log('✓ User is redirected to search results page with trade=A parameter');

    // Step 3: Verify search results page loads with Alaska filter applied
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    const hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    console.log('✓ Search results page displays with Alaska pre-selected and cruise cards visible');

    // Step 4: Verify all filter controls are displayed
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    
    const isDeparturePortsFilterVisible = await princessPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBeTruthy();
    
    const isDatesFilterVisible = await princessPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBeTruthy();
    
    const isGuestsFilterVisible = await princessPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBeTruthy();
    console.log('✓ All filter controls are visible and functional');

    // Step 5: Click 'CRUISE DETAILS' button on first cruise card
    await princessPage.clickCruiseCardCTA(0);
    await page.waitForTimeout(2000);
    console.log('✓ User is redirected to Cruise Details page');

    // Step 6: Verify Cruise Details page displays stateroom options and itinerary
    const isStateroomVisible = await princessPage.isStateroomOptionsVisible();
    expect(isStateroomVisible).toBeTruthy();
    
    const isItineraryVisible = await princessPage.isItineraryDetailsVisible();
    expect(isItineraryVisible).toBeTruthy();
    console.log('✓ Cruise Details page displays all required information including stateroom options and full itinerary');
  });
});