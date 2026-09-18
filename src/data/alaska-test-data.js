const testData = {
  urls: {
    alaskaLandingPage: 'https://www.princess.com/en-int/cruise-destinations/alaska-cruises',
    searchResults: 'https://www.princess.com/cruise-search/results/',
    searchResultsWithAlaska: 'https://www.princess.com/cruise-search/results/?trade=A',
  },
  text: {
    heroHeading: 'Alaska cruise line',
    bookYourVacationButton: 'BOOK YOUR VACATION',
    cookieAcceptButton: 'I Acknowledge',
    alaskaDestination: 'Alaska',
  },
  urlParams: {
    alaskaTrade: 'trade=A',
    invalidTrade: 'trade=INVALID',
  },
  viewports: {
    mobile: { width: 375, height: 667 },
    mobileAlt: { width: 414, height: 896 },
    tablet: { width: 768, height: 1024 },
    tabletLandscape: { width: 1024, height: 768 },
    desktop: { width: 1920, height: 1080 },
  },
};

module.exports = testData;