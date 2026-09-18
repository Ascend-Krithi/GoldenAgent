const { test, expect } = require('../../fixtures');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-457] Verify at least one valid Alaska cruise card is displayed', () => {
  let cruiseSearchPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
  });

  test('[QE-457] TS-006: Verify that at least one valid Alaska cruise card is displayed in the results grid', async ({ page }) => {
    // Arrange & Act - Navigate to cruise search results page with trade=A parameter
    await cruiseSearchPage.gotoWithTradeParameter(TD.tradeParameters.alaska);

    // Assert - Search results page loads successfully
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade, { timeout: 60000 });

    // Assert - Verify Alaska filter is applied
    const isAlaskaSelected = await cruiseSearchPage.isAlaskaDestinationSelected();
    expect(isAlaskaSelected).toBeTruthy();

    // Assert - Verify at least one cruise card is displayed in results grid
    const cruiseCardCount = await cruiseSearchPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThan(0);
    await expect(cruiseSearchPage.getFirstCruiseCard()).toBeVisible();
  });
});