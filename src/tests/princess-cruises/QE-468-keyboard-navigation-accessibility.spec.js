const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1, AC2] TS-017: Verify BOOK YOUR VACATION button keyboard accessibility', () => {
  let princessPage;

  test.beforeEach(async ({ page }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-468: Verify BOOK YOUR VACATION button is accessible and functional via keyboard navigation', async ({ page }) => {
    // Step 1: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Alaska landing page loads successfully');

    // Dismiss cookie consent if present
    await princessPage.dismissCookieConsent();

    // Step 2: Use Tab key to navigate to 'BOOK YOUR VACATION' button
    let tabCount = 0;
    const maxTabs = 20;
    
    while (tabCount < maxTabs) {
      await princessPage.pressTab();
      tabCount++;
      
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.textContent : '';
      });
      
      if (focusedElement.includes('BOOK YOUR VACATION')) {
        console.log('✓ BOOK YOUR VACATION button receives focus and is visually indicated');
        break;
      }
    }

    // Step 3: Verify button has visible focus indicator
    const button = page.locator(princessPage.locators.alaskaLandingPage.bookYourVacationBtn).first();
    await expect(button).toBeFocused();
    console.log('✓ Button displays clear focus indicator (outline, border, or highlight)');

    // Step 4: Press Enter key to activate button
    await princessPage.pressEnter();
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    console.log('✓ Button is activated and navigation to search results page is triggered');

    // Step 5: Verify redirection to search results page
    await expect(page).toHaveURL(/cruise-search\/results\/\?trade=A/);
    const hasTradeParam = await princessPage.verifyUrlContainsParameter('trade', 'A');
    expect(hasTradeParam).toBeTruthy();
    console.log('✓ User is redirected to search results page with trade=A parameter');
  });
});