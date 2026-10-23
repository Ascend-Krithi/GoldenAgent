const loc = require('./locators/orangehrm-dashboard.locators');
const testData = require('../data/orangehrm-test-data');

const URL = testData.urls.dashboardUrl;

class OrangeHRMDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isDashboardPageLoaded() {
    try {
      await loc.dashboardHeadingByRole(this.page).waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getDashboardHeadingText() {
    return await loc.dashboardHeadingByRole(this.page).textContent();
  }

  async isLeftNavSearchVisible() {
    try {
      await loc.leftNavSearch(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isUpgradeButtonVisible() {
    try {
      await loc.upgradeButton(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isUserDropdownVisible() {
    try {
      await loc.userDropdown(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isTimeAtWorkCardVisible() {
    try {
      await loc.timeAtWorkCard(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isMyActionsCardVisible() {
    try {
      await loc.myActionsCard(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isQuickLaunchCardVisible() {
    try {
      await loc.quickLaunchCard(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isBuzzLatestPostsCardVisible() {
    try {
      await loc.buzzLatestPostsCard(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isEmployeesOnLeaveTodayCardVisible() {
    try {
      await loc.employeesOnLeaveTodayCard(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async areAllNavigationModulesVisible() {
    try {
      await loc.adminNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.pimNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.leaveNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.timeNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.recruitmentNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.myInfoNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.performanceNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.directoryNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.maintenanceNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.claimNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      await loc.buzzNavLink(this.page).waitFor({ state: 'attached', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async clickUserDropdown() {
    await loc.userDropdown(this.page).click();
  }

  async searchInLeftNav(searchText) {
    await loc.leftNavSearch(this.page).fill(searchText);
  }
}

module.exports = OrangeHRMDashboardPage;