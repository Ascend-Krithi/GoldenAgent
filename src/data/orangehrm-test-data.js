const testData = {
  // URLs
  loginUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  dashboardUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
  baseUrl: 'https://opensource-demo.orangehrmlive.com',
  
  // Credentials
  validUsername: 'Admin',
  validPassword: 'admin123',
  
  // Expected Texts
  loginHeadingText: 'Login',
  dashboardHeadingText: 'Dashboard',
  timeAtWorkWidgetTitle: 'Time at Work',
  myActionsWidgetTitle: 'My Actions',
  quickLaunchWidgetTitle: 'Quick Launch',
  
  // Navigation Modules
  navigationModules: [
    'Admin',
    'PIM',
    'Leave',
    'Time',
    'Recruitment',
    'My Info',
    'Performance',
    'Dashboard',
    'Directory',
    'Maintenance',
    'Claim',
    'Buzz'
  ],
  
  // Quick Launch Shortcuts
  quickLaunchShortcuts: [
    'Assign Leave',
    'Leave List',
    'Timesheets',
    'Apply Leave',
    'My Leave',
    'My Timesheet'
  ],
  
  // Timeouts
  pageLoadTimeout: 60000,
  defaultTimeout: 10000
};

module.exports = testData;