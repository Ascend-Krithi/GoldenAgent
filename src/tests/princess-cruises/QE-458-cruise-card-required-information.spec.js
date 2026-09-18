const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC3] TS-007: Verify cruise card displays all required information', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-458: Verify that each cruise card displays all required information: Itinerary Title, Duration, Starting Price, and CTA button', async ({ page }) => {
    // Step 1: Navigate to cruise search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads with Alaska cruise cards');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Select first cruise card for inspection
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    console.log('✓ First cruise card is identified');

    // Step 3: Verify Cruise Itinerary Title is displayed
    const hasTitle = await princessPage.verifyCruiseCardHasTitle(0);
    expect(hasTitle).toBeTruthy();
    console.log('✓ Cruise Itinerary Title is visible and contains text');

    // Step 4: Verify Duration (Nights/Days) is displayed
    const hasDuration = await princessPage.verifyCruiseCardHasDuration(0);
    expect(hasDuration).toBeTruthy();
    console.log('✓ Duration information is visible in format showing nights/days');

    // Step 5: Verify Starting Price is displayed
    const hasPrice = await princessPage.verifyCruiseCardHasPrice(0);
    expect(hasPrice).toBeTruthy();
    console.log('✓ Starting Price is visible with currency symbol');

    // Step 6: Verify CTA button is displayed
    const hasCTA = await princessPage.verifyCruiseCardHasCTA(0);
    expect(hasCTA).toBeTruthy();
    console.log('✓ CTA button is visible and clickable');
  });
});