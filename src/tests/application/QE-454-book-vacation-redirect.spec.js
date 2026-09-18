const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-454] Book Your Vacation Button Redirect', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let alaskaPage;
  let searchResultsPage;

  test('[QE-454] TS-003: Verify that clicking BOOK YOUR VACATION button redirects to cruise search results page with correct URL parameter', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);

    // Handle cookie consent if present
    await alaskaPage.acceptCookieConsent();

    // Step 2: Wait for hero banner to fully load
    await alaskaPage.waitForHeroBannerLoad();

    // Step 3: Click on 'BOOK YOUR VACATION' CTA button
    await alaskaPage.clickBookYourVacation();

    // Step 4: Verify redirection to cruise search results page
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);
    expect(page.url()).toContain('cruise-search/results');
  });
});