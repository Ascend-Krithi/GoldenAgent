const locators = {
  heroBanner: (page) => page.locator('.hero-banner').first(),
  heroHeading: (page) => page.getByRole('heading', { name: 'Alaska cruise line' }),
  bookYourVacationButton: (page) => page.locator('a:has-text("BOOK YOUR VACATION")').first(),
  cookieConsentBanner: (page) => page.locator('#onetrust-banner-sdk'),
  cookieAcceptButton: (page) => page.locator('#onetrust-accept-btn-handler'),
  headerCreateAccountLink: (page) => page.locator('a.cmp-header__nav-item-register'),
  headerLoginLink: (page) => page.locator('a.cmp-header__nav-item-login'),
};

module.exports = locators;