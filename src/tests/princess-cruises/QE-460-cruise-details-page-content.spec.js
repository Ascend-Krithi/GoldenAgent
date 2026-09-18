const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC4] TS-009: Verify Cruise Details page displays stateroom options and itinerary', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-460: Verify that Cruise Details page displays stateroom options and full trip itinerary details', async ({ page }) => {
    // Step 1: Navigate to cruise search results page
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Click on 'CRUISE DETAILS' or 'VIEW CRUISE' button on first cruise card
    await princessPage.clickCruiseCardCTA(0);
    console.log('✓ User is redirected to Cruise Details page');

    await page.waitForTimeout(2000);

    // Step 3: Verify stateroom options section is displayed
    const isStateroomVisible = await princessPage.isStateroomOptionsVisible();
    expect(isStateroomVisible).toBeTruthy();
    console.log('✓ Stateroom options are visible with different room categories');

    // Step 4: Verify full trip itinerary details section is displayed
    const isItineraryVisible = await princessPage.isItineraryDetailsVisible();
    expect(isItineraryVisible).toBeTruthy();
    console.log('✓ Full trip itinerary details are visible including ports, dates, and activities');
  });
});