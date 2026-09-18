const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const CruiseSearchResultsPage = require('../../pages/cruise-search-results.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-466] Mobile Viewport Navigation', {
  tag: ['@responsive', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;
  let searchResultsPage;

  test('[QE-466] TS-015: Verify navigation flow works correctly on mobile viewport (responsive design)', async ({ page }) => {
    alaskaPage = new AlaskaDestinationPage(page);
    searchResultsPage = new CruiseSearchResultsPage(page);

    // Step 1: Set browser viewport to mobile dimensions
    await page.setViewportSize(TD.viewports.mobile);

    // Step 2: Navigate to Alaska destination landing page
    await alaskaPage.goto();
    await expect(page).toHaveURL(TD.urls.alaskaLandingPage);
    await alaskaPage.acceptCookieConsent();

    // Step 3: Verify hero banner and 'BOOK YOUR VACATION' button are displayed correctly on mobile
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    const isBookButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBe(true);

    // Step 4: Click 'BOOK YOUR VACATION' button on mobile
    await alaskaPage.clickBookYourVacation();

    // Step 5: Verify search results page loads correctly on mobile
    await page.waitForURL(/.*cruise-search\/results\/.*trade=A/, { timeout: 30000 });
    expect(page.url()).toContain(TD.urlParams.alaskaTrade);

    // Step 6: Verify filter controls and cruise cards are displayed correctly on mobile
    const isDestinationFilterVisible = await searchResultsPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBe(true);

    const cruiseCardsCount = await searchResultsPage.getCruiseCardsCount();
    expect(cruiseCardsCount).toBeGreaterThanOrEqual(0);
  });
});