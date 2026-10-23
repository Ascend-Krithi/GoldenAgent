const testData = {
  urls: {
    loginUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    dashboardUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
  },
  credentials: {
    validUsername: 'Admin',
    validPassword: process.env.ORANGEHRM_PASSWORD || 'admin123',
  },
  pageHeadings: {
    login: 'Login',
    dashboard: 'Dashboard',
  },
  dashboardWidgets: [
    'Time at Work',
    'My Actions',
    'Quick Launch',
    'Buzz Latest Posts',
    'Employees on Leave Today',
  ],
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
    'Buzz',
  ],
};

module.exports = testData;