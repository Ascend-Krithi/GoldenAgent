const loc = require('./locators/orangehrm-dashboard.locators');
const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

class OrangeHRMDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isDashboardDisplayed() {
    await loc.dashboardHeading(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.dashboardHeading(this.page).isVisible();
  }

  async isUpgradeButtonVisible() {
    return await loc.upgradeButton(this.page).isVisible();
  }

  async isUserDropdownVisible() {
    return await loc.userDropdown(this.page).isVisible();
  }

  async isMyActionsWidgetVisible() {
    return await loc.myActionsCard(this.page).isVisible();
  }

  async isPendingSelfReviewVisible() {
    try {
      await loc.pendingSelfReview(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isCandidateToInterviewVisible() {
    try {
      await loc.candidateToInterview(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getPendingSelfReviewText() {
    return await loc.pendingSelfReview(this.page).textContent();
  }

  async getCandidateToInterviewText() {
    return await loc.candidateToInterview(this.page).textContent();
  }

  async isQuickLaunchWidgetVisible() {
    return await loc.quickLaunchCard(this.page).isVisible();
  }

  async isQuickLaunchShortcutVisible(shortcutName) {
    const shortcutMap = {
      'Assign Leave': loc.quickLaunchAssignLeave,
      'Leave List': loc.quickLaunchLeaveList,
      'Timesheets': loc.quickLaunchTimesheets,
      'Apply Leave': loc.quickLaunchApplyLeave,
      'My Leave': loc.quickLaunchMyLeave,
      'My Timesheet': loc.quickLaunchMyTimesheet
    };
    try {
      await shortcutMap[shortcutName](this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async countQuickLaunchShortcuts() {
    const shortcuts = [
      loc.quickLaunchAssignLeave,
      loc.quickLaunchLeaveList,
      loc.quickLaunchTimesheets,
      loc.quickLaunchApplyLeave,
      loc.quickLaunchMyLeave,
      loc.quickLaunchMyTimesheet
    ];
    let count = 0;
    for (const shortcut of shortcuts) {
      const isVisible = await shortcut(this.page).isVisible();
      if (isVisible) count++;
    }
    return count;
  }

  async searchSidenavModule(searchTerm) {
    await loc.sidenavSearch(this.page).click();
    await loc.sidenavSearch(this.page).fill(searchTerm);
  }

  async clearSidenavSearch() {
    await loc.sidenavSearch(this.page).clear();
  }

  async isNavModuleVisible(moduleName) {
    const moduleMap = {
      'Admin': loc.navModuleAdmin,
      'PIM': loc.navModulePIM,
      'Leave': loc.navModuleLeave,
      'Time': loc.navModuleTime,
      'Recruitment': loc.navModuleRecruitment,
      'My Info': loc.navModuleMyInfo,
      'Performance': loc.navModulePerformance,
      'Dashboard': loc.navModuleDashboard,
      'Directory': loc.navModuleDirectory,
      'Maintenance': loc.navModuleMaintenance,
      'Claim': loc.navModuleClaim,
      'Buzz': loc.navModuleBuzz
    };
    return await moduleMap[moduleName](this.page).isVisible();
  }

  async isBuzzLatestPostsWidgetVisible() {
    return await loc.buzzLatestPostsCard(this.page).isVisible();
  }

  async isEmployeesOnLeaveWidgetVisible() {
    return await loc.employeesOnLeaveCard(this.page).isVisible();
  }

  async isEmployeeDistributionSubUnitWidgetVisible() {
    return await loc.employeeDistributionSubUnitCard(this.page).isVisible();
  }

  async isEmployeeDistributionLocationWidgetVisible() {
    return await loc.employeeDistributionLocationCard(this.page).isVisible();
  }

  async isTimeAtWorkWidgetVisible() {
    return await loc.timeAtWorkCard(this.page).isVisible();
  }

  async extractNumericCount(text) {
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}

module.exports = OrangeHRMDashboardPage;