const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-469] Browser Back Navigation', {
  tag: ['@regression', '@alaska-booking']
}, () => {
  let alaskaPage;
  let searchResultsPage;

  test('[QE-469] TS-018: Verify behavior when user navigates back from search results to Alaska landing page using browser back button', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);
    await alaskaPage.acceptCookieConsent();

    // Step 2: Click 'BOOK YOUR VACATION' button
    await alaskaPage.clickBookYourVacation();

    // Step 3: Verify search results page is displayed
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    // Step 4: Click browser back button
    await page.goBack();

    // Step 5: Verify Alaska landing page is displayed
    await page.waitForURL(/.*cruise-destinations\/alaska-cruises/, { timeout: 30000 });
    expect(page.url()).toContain('cruise-destinations/alaska-cruises');

    // Step 6: Verify page elements are functional after back navigation
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    const isBookButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBe(true);
  });
});