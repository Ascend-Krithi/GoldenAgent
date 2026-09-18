const { test, expect } = require('../../fixtures');
const AlaskaDestinationPage = require('../../pages/alaska-destination.page');
const TD = require('../../data/alaska-test-data');

test.describe('[QE-470] Slow Network Page Load', {
  tag: ['@performance', '@regression', '@alaska-booking']
}, () => {
  let alaskaPage;

  test('[QE-470] TS-019: Verify page behavior when Alaska landing page loads with slow network connection', async ({ page, context }) => {
    alaskaPage = new AlaskaDestinationPage(page);

    // Step 1: Enable network throttling to Slow 3G
    const client = await context.newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (50 * 1024) / 8,
      uploadThroughput: (50 * 1024) / 8,
      latency: 2000,
    });

    // Step 2: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 4: Wait for page to fully load
    await page.waitForLoadState('domcontentloaded', { timeout: 90000 });

    // Step 5: Verify hero banner and 'BOOK YOUR VACATION' button are displayed
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    const isBookButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isBookButtonVisible).toBe(true);

    // Step 6: Verify button functionality after slow load
    await alaskaPage.clickBookYourVacation();
    await page.waitForURL(/.*cruise-search\/results\/.*/, { timeout: 90000 });
  });
});