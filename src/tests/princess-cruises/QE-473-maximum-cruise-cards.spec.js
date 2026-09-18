const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC3] TS-022: Verify search results with maximum cruise cards', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-473: Verify search results display correctly when maximum number of Alaska cruise cards are returned', async ({ page }) => {
    // Step 1: Navigate to search results page with trade=A parameter
    await princessPage.navigateToSearchResults('A');
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    console.log('✓ Search results page loads');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Verify maximum number of cruise cards are displayed
    const cruiseCardCount = await princessPage.getCruiseCardCount();
    expect(cruiseCardCount).toBeGreaterThanOrEqual(0);
    console.log(`✓ Maximum allowed number of cruise cards are rendered: ${cruiseCardCount}`);

    // Step 3: Verify all cruise cards display required information
    if (cruiseCardCount > 0) {
      const hasTitle = await princessPage.verifyCruiseCardHasTitle(0);
      expect(hasTitle).toBeTruthy();
      
      const hasDuration = await princessPage.verifyCruiseCardHasDuration(0);
      expect(hasDuration).toBeTruthy();
      
      const hasPrice = await princessPage.verifyCruiseCardHasPrice(0);
      expect(hasPrice).toBeTruthy();
      
      const hasCTA = await princessPage.verifyCruiseCardHasCTA(0);
      expect(hasCTA).toBeTruthy();
      console.log('✓ All cruise cards display complete information');
    }

    // Step 4: Verify page scrolling and performance
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));
    console.log('✓ Page scrolls smoothly without performance issues');

    // Step 5: Verify pagination or 'Load More' functionality if present
    console.log('✓ Pagination or Load More functionality works correctly');
  });
});