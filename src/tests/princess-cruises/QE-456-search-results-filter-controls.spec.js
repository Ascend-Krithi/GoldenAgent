const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC3] TS-005: Verify search results page displays all required filter controls', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-456: Verify that search results page displays all required filter controls (Destination, Departure Ports, Dates, Guests)', async ({ page }) => {
    // Step 1: Navigate to cruise search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify Destination filter control is displayed
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    console.log('✓ Destination filter is visible and accessible');

    // Step 3: Verify Departure Ports filter control is displayed
    const isDeparturePortsFilterVisible = await princessPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBeTruthy();
    console.log('✓ Departure Ports filter is visible and accessible');

    // Step 4: Verify Dates filter control is displayed
    const isDatesFilterVisible = await princessPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBeTruthy();
    console.log('✓ Dates filter is visible and accessible');

    // Step 5: Verify Guests filter control is displayed
    const isGuestsFilterVisible = await princessPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBeTruthy();
    console.log('✓ Guests filter is visible and accessible');
  });
});