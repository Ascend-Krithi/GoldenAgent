const loc = require('./locators/dashboard.locators');
const TD = require('../data/orangehrm-test-data');

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.dashboard, { waitUntil: 'domcontentloaded', timeout: 60000 });
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

  async isAttendanceCardDetailsVisible() {
    return await loc.attendanceCardDetails(this.page).isVisible();
  }

  async isAttendanceActionButtonVisible() {
    return await loc.attendanceActionButton(this.page).isVisible();
  }

  async isAttendanceSummaryVisible() {
    return await loc.attendanceSummary(this.page).isVisible();
  }

  async getAttendanceCardDetailsText() {
    return await loc.attendanceCardDetails(this.page).textContent();
  }

  async getAttendanceSummaryText() {
    return await loc.attendanceSummary(this.page).textContent();
  }

  async isPendingSelfReviewVisible() {
    const count = await loc.pendingSelfReview(this.page).count();
    return count > 0;
  }

  async isCandidateToInterviewVisible() {
    const count = await loc.candidateToInterview(this.page).count();
    return count > 0;
  }

  async areActionIconButtonsVisible() {
    const count = await loc.actionIconButtons(this.page).count();
    return count > 0;
  }

  async isUpgradeButtonVisible() {
    return await loc.upgradeButton(this.page).isVisible();
  }

  async isUserDropdownVisible() {
    return await loc.userDropdown(this.page).isVisible();
  }

  async waitForDashboardToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  }
}

module.exports = DashboardPage;