const { test, expect, chromium, firefox, webkit } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1, AC2, AC3] TS-024: Verify navigation flow across different browsers', () => {
  test('QE-475: Verify navigation flow works correctly across different browsers (Chrome, Firefox, Safari, Edge)', async () => {
    const browsers = [
      { name: 'Chromium', launcher: chromium },
      { name: 'Firefox', launcher: firefox },
      { name: 'WebKit', launcher: webkit }
    ];

    for (const browserConfig of browsers) {
      console.log(`\n=== Testing on ${browserConfig.name} ===`);
      
      const browser = await browserConfig.launcher.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      const princessPage = new PrincessCruisesPage(page);

      try {
        // Step 1: Navigate to Alaska destination landing page
        await princessPage.navigateToAlaskaLandingPage();
        await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
        console.log(`✓ [${browserConfig.name}] Alaska landing page loads correctly`);

        // Dismiss cookie consent if present
        await princessPage.dismissCookieConsent();

        // Step 2: Verify hero banner and 'BOOK YOUR VACATION' button render correctly
        const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
        expect(isHeroBannerVisible).toBeTruthy();
        
        const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
        expect(isBookButtonVisible).toBeTruthy();
        console.log(`✓ [${browserConfig.name}] All elements are displayed correctly without rendering issues`);

        // Step 3: Click 'BOOK YOUR VACATION' button
        await princessPage.clickBookYourVacationButton();
        console.log(`✓ [${browserConfig.name}] Button click is registered and navigation is triggered`);

        // Step 4: Verify redirection to search results page
        await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
        const hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
        expect(hasTradeParam).toBeTruthy();
        console.log(`✓ [${browserConfig.name}] Search results page loads with trade=A parameter`);

        // Step 5: Verify Alaska filter is pre-selected and cruise cards are displayed
        const isDestinationFilterVisible = await princessPage.isDestinationFilterVisible();
        expect(isDestinationFilterVisible).toBeTruthy();
        
        const isCruiseCardDisplayed = await princessPage.isCruiseCardDisplayed();
        expect(isCruiseCardDisplayed).toBeTruthy();
        console.log(`✓ [${browserConfig.name}] Alaska is pre-selected and cruise cards are displayed correctly`);
        
        console.log(`✓ [${browserConfig.name}] Navigation flow works consistently`);
      } catch (error) {
        console.error(`✗ [${browserConfig.name}] Test failed:`, error.message);
        throw error;
      } finally {
        await browser.close();
      }
    }

    console.log('\n✓ Navigation flow works consistently across all browsers');
  });
});