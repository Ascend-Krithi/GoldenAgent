const TD = {
  urls: {
    login: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    dashboard: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
  },

  urlPatterns: {
    login: /\/auth\/login$/,
    dashboard: /\/dashboard\/index$/
  },

  credentials: {
    username: process.env.ORANGEHRM_USERNAME || 'Admin',
    password: process.env.ORANGEHRM_PASSWORD || 'admin123'
  },

  pageTitles: {
    login: /Login/,
    dashboard: /Dashboard/
  },

  widgets: {
    timeAtWork: 'Time at Work',
    myActions: 'My Actions',
    quickLaunch: 'Quick Launch',
    buzzLatestPosts: 'Buzz Latest Posts',
    employeesOnLeave: 'Employees on Leave Today',
    employeeDistributionSubUnit: 'Employee Distribution by Sub Unit',
    employeeDistributionLocation: 'Employee Distribution by Location'
  },

  shortcuts: {
    assignLeave: 'Assign Leave',
    leaveList: 'Leave List',
    timesheets: 'Timesheets',
    applyLeave: 'Apply Leave',
    myLeave: 'My Leave',
    myTimesheet: 'My Timesheet'
  },

  actions: {
    pendingSelfReview: 'Pending Self Review',
    candidateToInterview: 'Candidate to Interview'
  },

  modules: {
    admin: 'Admin',
    pim: 'PIM',
    leave: 'Leave',
    time: 'Time',
    recruitment: 'Recruitment',
    myInfo: 'My Info',
    performance: 'Performance',
    dashboard: 'Dashboard',
    directory: 'Directory',
    maintenance: 'Maintenance',
    claim: 'Claim',
    buzz: 'Buzz'
  },

  countRanges: {
    min: 0,
    max: 1000
  },

  validation: {
    nonNegativeInteger: /^\d+$/
  }
};

module.exports = TD;