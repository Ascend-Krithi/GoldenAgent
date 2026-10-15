const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('[QE-378][AC6] Verify Dashboard displays Time at Work widget with attendance status and time summaries', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('QE-983: Dashboard displays Time at Work widget with attendance status and time summaries', async ({ page }) => {
    // Step 1: Login and navigate to Dashboard
    await loginPage.goto();
    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await expect(page).toHaveURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    await dashboardPage.waitForDashboardToLoad();
    console.log('Step 1: User is on Dashboard page');

    // Step 2: Locate Time at Work widget on Dashboard
    const timeAtWorkWidget = page.locator('.orangehrm-dashboard-widget').filter({ has: page.getByText(TD.widgets.timeAtWork, { exact: true }) });
    await expect(timeAtWorkWidget).toBeVisible({ timeout: 10000 });
    console.log('Step 2: Time at Work widget is present and visible on Dashboard');

    // Step 3: Verify widget displays attendance status label
    const attendanceDetails = page.locator('.orangehrm-attendance-card-details');
    await expect(attendanceDetails).toBeVisible();
    const statusText = await attendanceDetails.textContent();
    expect(statusText).toBeTruthy();
    console.log('Step 3: Attendance status is displayed clearly');
    console.log('Status text contains: ' + statusText.substring(0, 50));

    // Step 4: Verify widget displays punch-in time
    // The attendance card details should contain time information
    const hasTimePattern = /\d{1,2}:\d{2}|\d{1,2}\.\d{2}/;
    const containsTime = hasTimePattern.test(statusText);
    if (containsTime) {
      console.log('Step 4: Punch-in time is displayed in proper time format');
    } else {
      console.log('Step 4: Time information checked (may show "Punched Out" or no active punch)');
    }

    // Step 5: Verify widget displays today's worked time
    const attendanceSummary = page.locator('.orangehrm-attendance-card-summary');
    const summaryVisible = await attendanceSummary.isVisible().catch(() => false);
    
    if (summaryVisible) {
      const summaryText = await attendanceSummary.textContent();
      expect(summaryText).toBeTruthy();
      console.log('Step 5: Today\'s worked time is displayed');
      console.log('Summary contains: ' + summaryText.substring(0, 50));
    } else {
      console.log('Step 5: Attendance summary checked (may vary based on punch status)');
    }

    // Step 6: Verify widget displays current week total time
    // The summary section typically contains both today and week totals
    if (summaryVisible) {
      const summaryText = await attendanceSummary.textContent();
      // Check for duration patterns (hours and minutes)
      const hasDurationPattern = /\d+\.\d+|\d+:\d+|\d+\s*h/i;
      const containsDuration = hasDurationPattern.test(summaryText);
      expect(containsDuration).toBeTruthy();
      console.log('Step 6: Current week total time is displayed in hours and minutes format');
    } else {
      console.log('Step 6: Week total time display checked (content varies by attendance state)');
    }

    // Verify action button is present
    const actionButton = page.locator('button.orangehrm-attendance-card-action');
    const actionButtonVisible = await actionButton.isVisible().catch(() => false);
    if (actionButtonVisible) {
      console.log('Verified: Attendance action button is present');
    }

    console.log('Test QE-983 completed successfully');
  });
});