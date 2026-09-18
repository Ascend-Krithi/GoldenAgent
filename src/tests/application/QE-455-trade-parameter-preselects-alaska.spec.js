const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-455] Trade Parameter Pre-selects Alaska', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let alaskaPage;
  let searchResultsPage;

  test('[QE-455] TS-004: Verify that trade=A URL parameter automatically pre-selects Alaska as the destination filter on search results page', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to Alaska landing page
    await alaskaPage.goto();
    await alaskaPage.acceptCookieConsent();

    // Step 2: Click 'BOOK YOUR VACATION' button
    await alaskaPage.clickBookYourVacation();

    // Step 3: Verify URL contains trade=A parameter
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    // Step 4: Verify Alaska destination filter is pre-selected
    const isAlaskaFilterApplied = await searchResultsPage.isAlaskaFilterApplied();
    expect(isAlaskaFilterApplied).toBe(true);
  });
});