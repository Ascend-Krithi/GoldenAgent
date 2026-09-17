const locators = {
  dashboardHeading: (page) => page.getByRole('heading', { name: 'Dashboard' }),
  upgradeButton: (page) => page.locator('button.orangehrm-upgrade-button'),
  userDropdown: (page) => page.locator('.oxd-userdropdown-tab'),
  sidenavSearch: (page) => page.locator('aside input[placeholder="Search"]'),

  timeAtWorkCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Time at Work', { exact: true }) }).first(),
  timeAtWorkState: (page) => page.locator('.orangehrm-attendance-card-state'),
  timeAtWorkDetails: (page) => page.locator('.orangehrm-attendance-card-details'),
  timeAtWorkSummary: (page) => page.locator('.orangehrm-attendance-card-summary'),
  timeAtWorkActionButton: (page) => page.locator('button.orangehrm-attendance-card-action'),

  myActionsCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('My Actions', { exact: true }) }).first(),
  pendingSelfReview: (page) => page.getByText(/Pending Self Review$/),
  candidateToInterview: (page) => page.getByText(/Candidate to Interview$/),
  actionIconButtons: (page) => page.locator('.orangehrm-todo-list-item button.orangehrm-report-icon'),

  quickLaunchCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Quick Launch', { exact: true }) }).first(),
  quickLaunchAssignLeave: (page) => page.locator('button[title="Assign Leave"]'),
  quickLaunchLeaveList: (page) => page.locator('button[title="Leave List"]'),
  quickLaunchTimesheets: (page) => page.locator('button[title="Timesheets"]'),
  quickLaunchApplyLeave: (page) => page.locator('button[title="Apply Leave"]'),
  quickLaunchMyLeave: (page) => page.locator('button[title="My Leave"]'),
  quickLaunchMyTimesheet: (page) => page.locator('button[title="My Timesheet"]'),

  buzzLatestPostsCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Buzz Latest Posts', { exact: true }) }).first(),
  buzzWidget: (page) => page.locator('.orangehrm-buzz-widget'),

  employeesOnLeaveCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employees on Leave Today', { exact: true }) }).first(),
  empLeaveChart: (page) => page.locator('.emp-leave-chart'),
  employeeLeaveRows: (page) => page.locator('.orangehrm-leave-card-item, .orangehrm-leave-card-profile'),

  employeeDistributionSubUnitCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Sub Unit', { exact: true }) }).first(),
  employeeDistributionLocationCard: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Location', { exact: true }) }).first(),
  chartLegends: (page) => page.locator('.oxd-chart-legend'),
  chartLegendItem: (page, title) => page.locator(`.oxd-chart-legend .oxd-text--span[title="${title}"]`),

  navModuleAdmin: (page) => page.locator('aside a[href="/web/index.php/admin/viewAdminModule"]'),
  navModulePIM: (page) => page.locator('aside a[href="/web/index.php/pim/viewPimModule"]'),
  navModuleLeave: (page) => page.locator('aside a[href="/web/index.php/leave/viewLeaveModule"]'),
  navModuleTime: (page) => page.locator('aside a[href="/web/index.php/time/viewTimeModule"]'),
  navModuleRecruitment: (page) => page.locator('aside a[href="/web/index.php/recruitment/viewRecruitmentModule"]'),
  navModuleMyInfo: (page) => page.locator('aside a[href="/web/index.php/pim/viewMyDetails"]'),
  navModulePerformance: (page) => page.locator('aside a[href="/web/index.php/performance/viewPerformanceModule"]'),
  navModuleDashboard: (page) => page.locator('aside a[href="/web/index.php/dashboard/index"]'),
  navModuleDirectory: (page) => page.locator('aside a[href="/web/index.php/directory/viewDirectory"]'),
  navModuleMaintenance: (page) => page.locator('aside a[href="/web/index.php/maintenance/viewMaintenanceModule"]'),
  navModuleClaim: (page) => page.locator('aside a[href="/web/index.php/claim/viewClaimModule"]'),
  navModuleBuzz: (page) => page.locator('aside a[href="/web/index.php/buzz/viewBuzz"]')
};

module.exports = locators;