module.exports = {
  urls: {
    login: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    dashboard: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
  },
  urlPatterns: {
    login: /\/auth\/login$/,
    dashboard: /\/dashboard\/index$/
  },
  credentials: {
    username: 'Admin',
    // Password sourced from environment variable for security
    password: process.env.ORANGEHRM_PASSWORD || 'admin123'
  },
  pageTitles: {
    login: 'Login',
    dashboard: 'Dashboard'
  },
  widgets: {
    timeAtWork: 'Time at Work',
    myActions: 'My Actions',
    quickLaunch: 'Quick Launch',
    buzzLatestPosts: 'Buzz Latest Posts',
    employeesOnLeaveToday: 'Employees on Leave Today',
    employeeDistributionBySubUnit: 'Employee Distribution by Sub Unit',
    employeeDistributionByLocation: 'Employee Distribution by Location'
  },
  placeholders: {
    username: 'Username',
    password: 'Password'
  }
};