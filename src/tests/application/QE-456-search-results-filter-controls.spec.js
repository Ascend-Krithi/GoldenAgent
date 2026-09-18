const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-456] Search Results Filter Controls', {
  tag: ['@smoke', '@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;

  test('[QE-456] TS-005: Verify that search results page displays all required filter controls (Destination, Departure Ports, Dates, Guests)', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to cruise search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Verify Destination filter control is displayed
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    // Step 3: Verify Departure Ports filter control is displayed
    const isDeparturePortsFilterVisible = await searchResultsPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBe(true);

    // Step 4: Verify Dates filter control is displayed
    const isDatesFilterVisible = await searchResultsPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBe(true);

    // Step 5: Verify Guests filter control is displayed
    const isGuestsFilterVisible = await searchResultsPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBe(true);
  });
});