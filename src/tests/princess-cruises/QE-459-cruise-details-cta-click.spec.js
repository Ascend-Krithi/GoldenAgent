const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC4] TS-008: Verify clicking CRUISE DETAILS button opens Cruise Details page', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-459: Verify that clicking CRUISE DETAILS or VIEW CRUISE button opens the Cruise Details/Itinerary page', async ({ page }) => {
    // Step 1: Navigate to cruise search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads with Alaska cruise cards');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Identify first cruise card with CTA button
    const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
    expect(isCruiseCardDisplayed).toBeTruthy();
    console.log('✓ First cruise card with CRUISE DETAILS or VIEW CRUISE button is identified');

    // Step 3: Click on 'CRUISE DETAILS' or 'VIEW CRUISE' button
    await princessPage.clickCruiseCardCTA(0);
    console.log('✓ Button click is registered');

    // Step 4: Verify redirection to Cruise Details/Itinerary page
    await page.waitForTimeout(2000);
    const currentUrl = await princessPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/cruise-search/results/');
    console.log('✓ User is redirected to Cruise Details/Itinerary page');
  });
});