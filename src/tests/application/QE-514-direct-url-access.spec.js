const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC2] Direct URL Access Tests', { tag: ['@regression', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-514] Verify navigation when user directly accesses search results URL with trade=A parameter', async ({ page }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Navigate directly to search results URL with trade=A parameter
    await alaskaPage.gotoSearchResultsWithTrade(TD.parameters.tradeAlaska);

    // Step 2: Verify page loads without errors
    await expect(page).toHaveURL(new RegExp(TD.parameters.tradeAlaska));

    // Step 3: Verify Alaska destination filter is pre-selected
    const destinationValue = await alaskaPage.getDestinationFilterValue();
    expect(destinationValue).toBeTruthy();

    // Step 4: Verify search results display Alaska cruise cards
    const hasCruiseCards = await alaskaPage.isAtLeastOneCruiseCardVisible();
    expect(hasCruiseCards).toBe(true);

    // Step 5: Verify all filter controls are functional
    const isDestinationVisible = await alaskaPage.isDestinationFilterVisible();
    const isDeparturePortsVisible = await alaskaPage.isDeparturePortsFilterVisible();
    const isDatesVisible = await alaskaPage.isDatesFilterVisible();
    const isGuestsVisible = await alaskaPage.isGuestsFilterVisible();

    expect(isDestinationVisible).toBe(true);
    expect(isDeparturePortsVisible).toBe(true);
    expect(isDatesVisible).toBe(true);
    expect(isGuestsVisible).toBe(true);
  });
});