const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/princess-cruises/cruise-search.page');
const TD = require('../../data/princess-cruises-test-data');

test.describe('[QE-458] Verify each cruise card displays all required information', () => {
  let cruiseSearchPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
  });

  test('[QE-458] TS-007: Verify that each cruise card displays all required information: Itinerary Title, Duration, Starting Price, and CTA button', async ({ page }) => {
    // Arrange & Act - Navigate to cruise search results page with trade=A parameter
    await cruiseSearchPage.gotoWithTradeParameter(TD.tradeParameters.alaska);

    // Assert - Search results page loads with Alaska cruise cards
    await expect(page).toHaveURL(TD.urlPatterns.cruiseSearchWithTrade);
    await expect(cruiseSearchPage.getFirstCruiseCard()).toBeVisible({ timeout: 60000 });

    // Assert - Verify Cruise Itinerary Title is displayed
    const isTitleVisible = await cruiseSearchPage.isCruiseCardTitleVisible(0);
    expect(isTitleVisible).toBeTruthy();
    const titleText = await cruiseSearchPage.getCruiseCardTitleText(0);
    expect(titleText).toBeTruthy();
    expect(titleText.length).toBeGreaterThan(0);

    // Assert - Verify Duration (Nights/Days) is displayed
    const isDurationVisible = await cruiseSearchPage.isCruiseCardDurationVisible(0);
    expect(isDurationVisible).toBeTruthy();
    const durationText = await cruiseSearchPage.getCruiseCardDurationText(0);
    expect(durationText).toBeTruthy();

    // Assert - Verify Starting Price is displayed
    const isPriceVisible = await cruiseSearchPage.isCruiseCardPriceVisible(0);
    expect(isPriceVisible).toBeTruthy();
    const priceText = await cruiseSearchPage.getCruiseCardPriceText(0);
    expect(priceText).toBeTruthy();

    // Assert - Verify CTA button is displayed
    const isCTAVisible = await cruiseSearchPage.isCruiseCardCTAVisible(0);
    expect(isCTAVisible).toBeTruthy();
  });
});
