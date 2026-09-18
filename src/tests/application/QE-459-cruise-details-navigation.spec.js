const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const CruiseDetailsPage = require('../../pages/princess-cruises/cruise-details.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-459] Verify clicking CRUISE DETAILS button opens Cruise Details page', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('[QE-459] TS-008: Verify that clicking CRUISE DETAILS or VIEW CRUISE button opens the Cruise Details/Itinerary page', async ({ page }) => {
    // Arrange - Navigate to cruise search results page with trade=A parameter
    await cruiseSearchPage.gotoWithTradeParameter(TD.tradeParameters.alaska);
    await cruiseSearchPage.waitForCruiseCards();

    // Assert - Search results page loads with Alaska cruise cards
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade);
    await expect(cruiseSearchPage.getFirstCruiseCard()).toBeVisible({ timeout: 10000 });

    // Act - Identify first cruise card with CTA button
    const isCTAVisible = await cruiseSearchPage.isCruiseCardCTAVisible(0);
    expect(isCTAVisible).toBeTruthy();

    // Act - Click on 'CRUISE DETAILS' or 'VIEW CRUISE' button
    await cruiseSearchPage.clickCruiseCardCTA(0);

    // Assert - Verify redirection to Cruise Details/Itinerary page
    await expect(page).toHaveURL(TD.urlPatterns.cruiseDetails);
  });
});
