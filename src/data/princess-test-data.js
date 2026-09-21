const princessTestData = {
  urls: {
    alaskaLanding: 'https://www.princess.com/en-int/cruise-destinations/alaska-cruises',
    searchResults: 'https://www.princess.com/cruise-search/results/',
    searchResultsWithTradeA: 'https://www.princess.com/cruise-search/results/?trade=A'
  },
  urlPatterns: {
    searchResults: /\/cruise-search\/results\//,
    cruiseDetails: /\/cruise-details\/|^\/voyages\//
  },
  text: {
    bookYourVacation: 'BOOK YOUR VACATION',
    cruiseDetails: 'CRUISE DETAILS',
    alaskaHeadline: 'Alaska cruise line',
    noResultsFound: 'No cruises found',
    noResults: 'No results found'
  },
  parameters: {
    tradeAlaska: 'A',
    tradeInvalid: 'INVALID'
  },
  viewports: {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 }
  },
  timeouts: {
    pageLoad: 60000,
    navigation: 30000,
    elementVisible: 10000,
    shortWait: 5000
  }
};

module.exports = princessTestData;