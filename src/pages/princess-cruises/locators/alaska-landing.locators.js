const locators = {
  heroBanner: (page) => page.locator('[class*="hero-banner"], [class*="hero"], section[class*="banner"]').first(),
  bookYourVacationButton: (page) => page.locator('a:has-text("BOOK YOUR VACATION"), button:has-text("BOOK YOUR VACATION")').first(),
  cookieConsentBanner: (page) => page.locator('#onetrust-banner-sdk, [class*="cookie-banner"], [class*="consent-banner"]').first(),
  cookieAcceptButton: (page) => page.locator('#onetrust-accept-btn-handler, button:has-text("I Acknowledge")').first(),
};

module.exports = locators;