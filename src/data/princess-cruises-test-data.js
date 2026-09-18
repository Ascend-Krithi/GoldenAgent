const TD = {
  urls: {
    alaskaLanding: 'https://www.princess.com/en-int/cruise-destinations/alaska-cruises',
    cruiseSearchResults: 'https://www.princess.com/cruise-search/results/',
  },

  urlPatterns: {
    alaskaLanding: /\/cruise-destinations\/alaska-cruises$/,
    cruiseSearchResults: /\/cruise-search\/results/,
    cruiseSearchWithTrade: /.*cruise-search\/results\/\?trade=A.*/,
    cruiseDetails: /\/cruise-details\//,
  },

  tradeParameters: {
    alaska: 'A',
  },

  buttonText: {
    bookYourVacation: 'BOOK YOUR VACATION',
    cruiseDetails: 'CRUISE DETAILS',
    viewCruise: 'VIEW CRUISE',
    iAcknowledge: 'I Acknowledge',
  },

  destinations: {
    alaska: 'Alaska',
  },

  filterControls: {
    destination: 'Destination',
    departurePorts: 'Departure Ports',
    dates: 'Dates',
    guests: 'Guests',
  },

  cookieConsent: {
    buttonId: 'onetrust-accept-btn-handler',
  },
};

module.exports = TD;