const { test, expect } = require('../../fixtures');
const PrincessAlaskaPage = require('../../pages/princess-alaska.page');
const TD = require('../../data/princess-test-data');

test.describe('[QE-449][AC1] Page Load Performance Tests', { tag: ['@non-functional', '@princess-cruises'] }, () => {
  let alaskaPage;

  test('[QE-519] Verify page load performance when Alaska landing page takes longer than expected to render', async ({ page, context }) => {
    alaskaPage = new PrincessAlaskaPage(page);

    // Step 1: Enable network throttling to simulate 3G connection
    const client = await context.newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (750 * 1024) / 8,
      uploadThroughput: (250 * 1024) / 8,
      latency: 100
    });

    // Step 2: Navigate to Alaska destination landing page
    await alaskaPage.goto();

    // Step 3: Verify page eventually loads completely
    await expect(page).toHaveURL(TD.urls.alaskaLanding);

    // Step 4: Verify hero banner loads
    const isHeroBannerVisible = await alaskaPage.isHeroBannerVisible();
    expect(isHeroBannerVisible).toBe(true);

    // Step 5: Verify BOOK YOUR VACATION button is functional after slow load
    const isButtonVisible = await alaskaPage.isBookYourVacationButtonVisible();
    expect(isButtonVisible).toBe(true);
  });
});