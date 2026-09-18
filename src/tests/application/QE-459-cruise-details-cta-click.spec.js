const { test, expect } = require('../../fixtures');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-459] Cruise Details CTA Click', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let searchResultsPage;
  let cruiseDetailsPage;

  test('[QE-459] TS-008: Verify that clicking CRUISE DETAILS or VIEW CRUISE button opens the Cruise Details/Itinerary page', async ({ page }) => {
    searchResultsPage = new CruiseSearchResultsPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);

    // Step 1: Navigate to cruise search results page with trade=A parameter
    await searchResultsPage.goto('A');
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });

    // Step 2: Identify first cruise card with CTA button
    const isCTAVisible = await searchResultsPage.isCruiseCardCTAVisible(0);
    expect(isCTAVisible).toBe(true);

    // Step 3: Click on 'CRUISE DETAILS' or 'VIEW CRUISE' button
    await searchResultsPage.clickCruiseCardCTA(0);

    // Step 4: Verify redirection to Cruise Details/Itinerary page
    await page.waitForURL(/.*cruise-search\/details\/.*/, { timeout: 30000 });
    expect(page.url()).toContain('cruise-search/details');
  });
});