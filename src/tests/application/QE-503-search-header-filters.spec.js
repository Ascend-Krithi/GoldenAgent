const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC3] Search Header Filter Controls Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-503] Verify search results page displays search header with filter controls for Destination, Departure Ports, Dates, and Guests', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 2: Click BOOK YOUR VACATION button
    await alaskaPage.clickBookYourVacationButton();
    await alaskaPage.waitForURL(TD.urlPatterns.searchResults, TD.timeouts.navigation);

    // Step 3: Verify search header section is displayed
    const isSearchHeaderVisible = await alaskaPage.isSearchHeaderVisible();
    expect(isSearchHeaderVisible).toBe(true);

    // Step 4: Verify Destination filter control is present
    const isDestinationFilterVisible = await alaskaPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    // Step 5: Verify Departure Ports filter control is present
    const isDeparturePortsFilterVisible = await alaskaPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBe(true);

    // Step 6: Verify Dates filter control is present
    const isDatesFilterVisible = await alaskaPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBe(true);

    // Step 7: Verify Guests filter control is present
    const isGuestsFilterVisible = await alaskaPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBe(true);
  });
});