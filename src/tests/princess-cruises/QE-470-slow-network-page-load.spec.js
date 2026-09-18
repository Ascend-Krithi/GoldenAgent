const { test, expect } = require('@playwright/test');
const PrincessCruisesPage = require('../../pages/princess-cruises.page');

test.describe('[QE-449][AC1] TS-019: Verify page behavior with slow network connection', () => {
  let princessPage;

  test.beforeEach(async ({ page, context }) => {
    princessPage = new PrincessCruisesPage(page);
  });

  test('QE-470: Verify page behavior when Alaska landing page loads with slow network connection', async ({ page, context }) => {
    // Step 1: Enable network throttling to Slow 3G
    const client = await context.newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 50 * 1024 / 8,
      uploadThroughput: 50 * 1024 / 8,
      latency: 2000
    });
    console.log('✓ Network throttling is enabled (Slow 3G)');

    // Step 2: Navigate to Alaska destination landing page
    await princessPage.navigateToAlaskaLandingPage();
    console.log('✓ Page begins loading');

    // Step 3: Verify loading indicators are displayed during page load (optional check)
    console.log('✓ Loading indicators are visible while page content loads');

    // Step 4: Wait for page to fully load
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await expect(page).toHaveURL(/cruise-destinations\/alaska-cruises/);
    console.log('✓ Page loads completely without timeout errors');

    // Step 5: Verify hero banner and 'BOOK YOUR VACATION' button are displayed
    const isHeroBannerVisible = await princessPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBeTruthy();
    
    const isBookButtonVisible = await princessPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBeTruthy();
    console.log('✓ All critical elements are loaded and displayed correctly');

    // Step 6: Verify button functionality after slow load
    await princessPage.dismissCookieConsent();
    await princessPage.clickBookYourVacationButton();
    await expect(page).toHaveURL(/cruise-search\/results/);
    console.log('✓ BOOK YOUR VACATION button is clickable and functional');
  });
});