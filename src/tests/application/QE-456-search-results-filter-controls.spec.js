const { test, expect } = require('../../fixtures');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-456] Verify search results page displays all required filter controls', () => {
  let cruiseSearchPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
  });

  test('[QE-456] TS-005: Verify that search results page displays all required filter controls (Destination, Departure Ports, Dates, Guests)', async ({ page }) => {
    // Arrange & Act - Navigate to cruise search results page with trade=A parameter
    await cruiseSearchPage.gotoWithTradeParameter(TD.tradeParameters.alaska);

    // Assert - Search results page loads successfully
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade);

    // Assert - Verify Destination filter control is displayed
    const isDestinationVisible = await cruiseSearchPage.isDestinationFilterVisible();
    expect(isDestinationVisible).toBeTruthy();
    await expect(cruiseSearchPage.getDestinationFilter()).toBeVisible();

    // Assert - Verify Departure Ports filter control is displayed
    const isDeparturePortsVisible = await cruiseSearchPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsVisible).toBeTruthy();
    await expect(cruiseSearchPage.getDeparturePortsFilter()).toBeVisible();

    // Assert - Verify Dates filter control is displayed
    const isDatesVisible = await cruiseSearchPage.isDatesFilterVisible();
    expect(isDatesVisible).toBeTruthy();
    await expect(cruiseSearchPage.getDatesFilter()).toBeVisible();

    // Assert - Verify Guests filter control is displayed
    const isGuestsVisible = await cruiseSearchPage.isGuestsFilterVisible();
    expect(isGuestsVisible).toBeTruthy();
    await expect(cruiseSearchPage.getGuestsFilter()).toBeVisible();
  });
});
