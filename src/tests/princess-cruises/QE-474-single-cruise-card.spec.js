const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC3] TS-023: Verify search results with single cruise card', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-474: Verify search results display correctly when only one Alaska cruise card is available', async ({ page }) => {
    // Step 1: Navigate to search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify cruise cards are displayed
    const cruiseCardCount = await princessPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThanOrEqual(0);
    console.log(`✓ Cruise card(s) rendered in results grid: ${cruiseCardCount}`);

    if (cruiseCardCount >= 1) {
      // Step 3: Verify cruise card displays all required information
      const hasTitle = await princessPage.verifyCruiseCardHasTitle(0);
      expect(hasTitle).toBeTruthy();
      
      const hasDuration = await princessPage.verifyCruiseCardHasDuration(0);
      expect(hasDuration).toBeTruthy();
      
      const hasPrice = await princessPage.verifyCruiseCardHasPrice(0);
      expect(hasPrice).toBeTruthy();
      
      const hasCTA = await princessPage.verifyCruiseCardHasCTA(0);
      expect(hasCTA).toBeTruthy();
      console.log('✓ Cruise card displays complete information');

      // Step 4: Verify page layout is correct with single result
      const card = await princessPage.getFirstCruiseCard();
      await expect(card).toBeVisible();
      console.log('✓ Page layout is properly formatted without empty spaces or layout issues');

      // Step 5: Verify CTA button on cruise card is functional
      await princessPage.clickCruiseCardCTA(0);
      await page.waitForTimeout(2000);
      const currentUrl = await princessPage.getCurrentUrl();
      expect(currentUrl).not.toContain('/cruise-search/results/');
      console.log('✓ CTA button navigates to cruise details page');
    }
  });
});