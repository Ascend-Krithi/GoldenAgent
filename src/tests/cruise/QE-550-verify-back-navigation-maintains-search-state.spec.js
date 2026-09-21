const { test, expect } = require('@playwright/test');
const CruiseSearchPage = require('../../pages/cruise-search.page');
const CruiseDetailsPage = require('../../pages/cruise-details.page');

test.describe('[QE-548][AC2] Verify back navigation maintains search state', () => {
  let cruiseSearchPage;
  let cruiseDetailsPage;

  test.beforeEach(async ({ page }) => {
    cruiseSearchPage = new CruiseSearchPage(page);
    cruiseDetailsPage = new CruiseDetailsPage(page);
  });

  test('QE-550: Validate back button maintains Alaska filtered search results with filters and scroll position', async ({ page }) => {
    // Step 1: Navigate to search results and apply Alaska filter
    await cruiseSearchPage.navigateToSearchResults('alaska');
    await cruiseSearchPage.verifySearchResultsDisplayed();
    console.log('✓ Search results display Alaska cruises');

    // Step 2: Apply date and price filters
    await cruiseSearchPage.applyDateFilter('June 2024');
    await cruiseSearchPage.applyPriceFilter(1000, 2000);
    console.log('✓ Results filtered with date (June 2024) and price ($1000-$2000)');

    // Step 3: Scroll to 5th cruise card
    await cruiseSearchPage.scrollToCruiseCard(5);
    await cruiseSearchPage.verifyCruiseCardInViewport(5);
    console.log('✓ Page scrolls to 5th card');

    // Step 4: Click View Details on 5th card
    await cruiseSearchPage.clickViewDetailsOnCard(5);
    await cruiseDetailsPage.verifyPageLoaded();
    console.log('✓ Navigation to Cruise Details page');

    // Step 5: Click Back button
    await cruiseDetailsPage.clickBack();
    console.log('✓ Navigation back to search results');

    // Step 6: Verify return to Alaska filtered results
    await cruiseSearchPage.verifySearchResultsDisplayed();
    await expect(page).toHaveURL(/destination=alaska/);
    console.log('✓ Search results page with correct URL');

    // Step 7: Verify Alaska filter remains selected
    await cruiseSearchPage.verifyAlaskaFilterActive();
    console.log('✓ Alaska filter visually indicated as active');

    // Step 8: Verify date filter remains active
    await cruiseSearchPage.verifyDateFilterActive('June 2024');
    console.log('✓ Date filter shows June 2024 selected');

    // Step 9: Verify price filter remains active
    await cruiseSearchPage.verifyPriceFilterActive('$1000-$2000');
    console.log('✓ Price filter shows range selected');

    // Step 10: Verify scroll position restored
    await cruiseSearchPage.verifyCruiseCardInViewport(5);
    console.log('✓ Page scrolled to 5th card in viewport');
  });
});