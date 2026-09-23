const locators = {
  dashboardHeading: (page) => page.getByRole('heading', { name: 'Dashboard' }).first(),
  dashboardHeadingAlt: (page) => page.locator('h6.oxd-topbar-header-breadcrumb-module').first(),
  leftNavSearch: (page) => page.locator('aside input[placeholder="Search"]').first(),
  upgradeButton: (page) => page.locator('button.orangehrm-upgrade-button').first(),
  userDropdown: (page) => page.locator('.oxd-userdropdown-tab').first(),
  activeDashboardNavLink: (page) => page.locator('aside a[href="/web/index.php/dashboard/index"]').first(),
  
  // Left Navigation Modules
  adminModule: (page) => page.locator('aside a[href="/web/index.php/admin/viewAdminModule"]').first(),
  pimModule: (page) => page.locator('aside a[href="/web/index.php/pim/viewPimModule"]').first(),
  leaveModule: (page) => page.locator('aside a[href="/web/index.php/leave/viewLeaveModule"]').first(),
  timeModule: (page) => page.locator('aside a[href="/web/index.php/time/viewTimeModule"]').first(),
  recruitmentModule: (page) => page.locator('aside a[href="/web/index.php/recruitment/viewRecruitmentModule"]').first(),
  myInfoModule: (page) => page.locator('aside a[href="/web/index.php/pim/viewMyDetails"]').first(),
  performanceModule: (page) => page.locator('aside a[href="/web/index.php/performance/viewPerformanceModule"]').first(),
  dashboardModule: (page) => page.locator('aside a[href="/web/index.php/dashboard/index"]').first(),
  directoryModule: (page) => page.locator('aside a[href="/web/index.php/directory/viewDirectory"]').first(),
  maintenanceModule: (page) => page.locator('aside a[href="/web/index.php/maintenance/viewMaintenanceModule"]').first(),
  claimModule: (page) => page.locator('aside a[href="/web/index.php/claim/viewClaimModule"]').first(),
  buzzModule: (page) => page.locator('aside a[href="/web/index.php/buzz/viewBuzz"]').first(),
  
  // Dashboard Widgets
  timeAtWorkWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Time at Work', { exact: true }) }).first(),
  myActionsWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('My Actions', { exact: true }) }).first(),
  quickLaunchWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Quick Launch', { exact: true }) }).first(),
  employeesOnLeaveTodayWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employees on Leave Today', { exact: true }) }).first(),
  employeeDistributionBySubUnitWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Sub Unit', { exact: true }) }).first(),
  employeeDistributionByLocationWidget: (page) => page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText('Employee Distribution by Location', { exact: true }) }).first(),
  
  // Quick Launch Shortcuts
  assignLeaveShortcut: (page) => page.locator('button[title="Assign Leave"]').first(),
  leaveListShortcut: (page) => page.locator('button[title="Leave List"]').first(),
  timesheetsShortcut: (page) => page.locator('button[title="Timesheets"]').first(),
  applyLeaveShortcut: (page) => page.locator('button[title="Apply Leave"]').first(),
  myLeaveShortcut: (page) => page.locator('button[title="My Leave"]').first(),
  myTimesheetShortcut: (page) => page.locator('button[title="My Timesheet"]').first()
};

module.exports = locators;