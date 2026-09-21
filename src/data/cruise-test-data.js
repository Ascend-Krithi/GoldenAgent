const cruiseTestData = {
  filters: {
    alaska: 'Alaska'
  },
  urls: {
    searchPage: 'https://cruise-app.example.com/search',
    detailsPagePattern: '/cruises/alaska/cruise-'
  },
  stateroomCategories: [
    'Interior',
    'Oceanview',
    'Balcony',
    'Suite'
  ],
  alaskaPorts: [
    'Juneau',
    'Skagway',
    'Ketchikan',
    'Glacier Bay'
  ],
  sections: {
    deckPlans: 'Deck Plans',
    includedAmenities: 'Included Amenities',
    diningOptions: 'Dining Options'
  },
  buttons: {
    viewDetails: 'View Details',
    bookNow: 'Book Now'
  }
};

module.exports = cruiseTestData;