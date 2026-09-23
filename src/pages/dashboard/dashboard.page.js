const loc = require('./locators/dashboard.locators');
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isDashboardHeadingVisible() {
    return await loc.dashboardHeading(this.page).isVisible();
  }

  async getDashboardHeadingText() {
    return await loc.dashboardHeading(this.page).textContent();
  }

  async isTimeAtWorkWidgetVisible() {
    return await loc.timeAtWorkWidget(this.page).isVisible();
  }

  async isMyActionsWidgetVisible() {
    return await loc.myActionsWidget(this.page).isVisible();
  }

  async isQuickLaunchWidgetVisible() {
    return await loc.quickLaunchWidget(this.page).isVisible();
  }

  async isEmployeesOnLeaveTodayWidgetVisible() {
    return await loc.employeesOnLeaveTodayWidget(this.page).isVisible();
  }

  async isEmployeeDistributionBySubUnitWidgetVisible() {
    return await loc.employeeDistributionBySubUnitWidget(this.page).isVisible();
  }

  async isEmployeeDistributionByLocationWidgetVisible() {
    return await loc.employeeDistributionByLocationWidget(this.page).isVisible();
  }

  async isAdminModuleVisible() {
    return await loc.adminModule(this.page).isVisible();
  }

  async isPimModuleVisible() {
    return await loc.pimModule(this.page).isVisible();
  }

  async isLeaveModuleVisible() {
    return await loc.leaveModule(this.page).isVisible();
  }

  async isTimeModuleVisible() {
    return await loc.timeModule(this.page).isVisible();
  }

  async isRecruitmentModuleVisible() {
    return await loc.recruitmentModule(this.page).isVisible();
  }

  async isMyInfoModuleVisible() {
    return await loc.myInfoModule(this.page).isVisible();
  }

  async isPerformanceModuleVisible() {
    return await loc.performanceModule(this.page).isVisible();
  }

  async isDashboardModuleVisible() {
    return await loc.dashboardModule(this.page).isVisible();
  }

  async isDirectoryModuleVisible() {
    return await loc.directoryModule(this.page).isVisible();
  }

  async isMaintenanceModuleVisible() {
    return await loc.maintenanceModule(this.page).isVisible();
  }

  async isClaimModuleVisible() {
    return await loc.claimModule(this.page).isVisible();
  }

  async isBuzzModuleVisible() {
    return await loc.buzzModule(this.page).isVisible();
  }

  async clickAssignLeaveShortcut() {
    await loc.assignLeaveShortcut(this.page).click();
    return true;
  }

  async clickLeaveListShortcut() {
    await loc.leaveListShortcut(this.page).click();
    return true;
  }

  async clickTimesheetsShortcut() {
    await loc.timesheetsShortcut(this.page).click();
    return true;
  }

  async clickApplyLeaveShortcut() {
    await loc.applyLeaveShortcut(this.page).click();
    return true;
  }

  async clickMyLeaveShortcut() {
    await loc.myLeaveShortcut(this.page).click();
    return true;
  }

  async clickMyTimesheetShortcut() {
    await loc.myTimesheetShortcut(this.page).click();
    return true;
  }

  async clickDashboardModule() {
    await loc.dashboardModule(this.page).click();
    return true;
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async checkForErrorMessages() {
    const errorSelectors = [
      '.oxd-alert--error',
      '.oxd-toast--error',
      '[role="alert"]',
      '.error-message'
    ];
    
    for (const selector of errorSelectors) {
      const errorElement = this.page.locator(selector).first();
      if (await errorElement.isVisible().catch(() => false)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = DashboardPage;