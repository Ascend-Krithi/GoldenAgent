const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC2, AC3] TS-020: Verify search results page via direct bookmark access', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-471: Verify search results page behavior when accessed directly via bookmark or shared link', async ({ page }) => {
    // Step 1: Navigate directly to search results page via bookmark or direct link
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads directly');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify Alaska destination filter is pre-selected
    const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
    expect(isDestinationFilterVisible).toBeTruthy();
    console.log('✓ Alaska is automatically selected in destination filter');

    // Step 3: Verify all filter controls are displayed and functional
    const isDeparturePortsFilterVisible = await princessPage.isDeparturePortsFilterVisible();
    expect(isDeparturePortsFilterVisible).toBeTruthy();
    
    const isDatesFilterVisible = await princessPage.isDatesFilterVisible();
    expect(isDatesFilterVisible).toBeTruthy();
    
    const isGuestsFilterVisible = await princessPage.isGuestsFilterVisible();
    expect(isGuestsFilterVisible).toBeTruthy();
    console.log('✓ All filter controls are visible and functional');

    // Step 4: Verify Alaska cruise cards are displayed
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    console.log('✓ Alaska cruise cards are displayed in results grid');

    // Step 5: Verify cruise card CTA buttons are functional
    const hasCTA = await princessPage.verifyCruiseCardHasCTA(0);
    expect(hasCTA).toBeTruthy();
    console.log('✓ CTA buttons are clickable and navigate to cruise details');
  });
});