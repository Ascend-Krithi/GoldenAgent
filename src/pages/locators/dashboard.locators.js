const locators = {
  dashboardHeading: (page) => page.getByRole('heading', { name: 'Dashboard' }).first(),
  topbarHeading: (page) => page.locator('h6.oxd-topbar-header-breadcrumb-module').first(),
  leftNavSearch: (page) => page.locator('aside input[placeholder="Search"]').first(),
  upgradeButton: (page) => page.locator('button.orangehrm-upgrade-button').first(),
  userDropdown: (page) => page.locator('.oxd-userdropdown-tab').first(),
  activeDashboardNavLink: (page) => page.locator('aside a[href="/web/index.php/dashboard/index"]').first(),
  
  // Time at Work Widget
  timeAtWorkWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Time at Work', { exact: true }) }).first(),
  attendanceCardDetails: (page) => page.locator('.orangehrm-attendance-card-details').first(),
  attendanceActionButton: (page) => page.locator('button.orangehrm-attendance-card-action').first(),
  attendanceSummary: (page) => page.locator('.orangehrm-attendance-card-summary').first(),
  
  // My Actions Widget
  pendingSelfReview: (page) => page.getByText(/Pending Self Review$/).first(),
  candidateToInterview: (page) => page.getByText(/Candidate to Interview$/).first(),
  actionIconButtons: (page) => page.locator('.orangehrm-todo-list-item button.orangehrm-report-icon').first(),
  
  // Other Widgets
  buzzLatestPostsWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Buzz Latest Posts', { exact: true }) }).first(),
  employeesOnLeaveTodayWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employees on Leave Today', { exact: true }) }).first(),
  employeeDistributionBySubUnitWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Sub Unit', { exact: true }) }).first(),
  employeeDistributionByLocationWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Location', { exact: true }) }).first(),
  
  // Buzz Widget
  buzzWidget: (page) => page.locator('.orangehrm-buzz-widget').first(),
  
  // Chart Elements
  chartLegend: (page) => page.locator('.oxd-chart-legend').first()
};
module.exports = locators;