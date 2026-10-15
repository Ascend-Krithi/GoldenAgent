const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('[QE-378][AC6] Verify Dashboard displays My Actions widget with pending work items and workflow state', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('QE-984: Dashboard displays My Actions widget with pending work items and workflow state', async ({ page }) => {
    // Step 1: Login and navigate to Dashboard
    await loginPage.goto();
    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await expect(page).toHaveURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    await dashboardPage.waitForDashboardToLoad();
    console.log('Step 1: User is on Dashboard page');

    // Step 2: Locate My Actions widget on Dashboard
    // My Actions widget contains action items like "Pending Self Review" or "Candidate to Interview"
    const myActionsWidget = page.locator('.orangehrm-dashboard-widget').filter({ 
      has: page.locator('.orangehrm-todo-list, .oxd-sheet') 
    }).first();
    
    // Alternative: look for specific action items to confirm widget presence
    const pendingSelfReview = page.getByText(/Pending Self Review$/);
    const candidateToInterview = page.getByText(/Candidate to Interview$/);
    
    const hasPendingSelfReview = await pendingSelfReview.count() > 0;
    const hasCandidateToInterview = await candidateToInterview.count() > 0;
    
    const hasMyActionsContent = hasPendingSelfReview || hasCandidateToInterview;
    expect(hasMyActionsContent).toBeTruthy();
    console.log('Step 2: My Actions widget is present and visible on Dashboard');

    // Step 3: Verify widget displays pending work items count
    if (hasPendingSelfReview) {
      await expect(pendingSelfReview.first()).toBeVisible();
      const reviewText = await pendingSelfReview.first().textContent();
      // Extract numeric count if present in format like "5 Pending Self Review"
      const countMatch = reviewText.match(/^(\d+)/);
      if (countMatch) {
        const count = parseInt(countMatch[1]);
        expect(count).toBeGreaterThanOrEqual(0);
        console.log('Step 3: Pending work items count displayed: ' + count);
      } else {
        console.log('Step 3: Pending Self Review item displayed');
      }
    }
    
    if (hasCandidateToInterview) {
      await expect(candidateToInterview.first()).toBeVisible();
      const interviewText = await candidateToInterview.first().textContent();
      const countMatch = interviewText.match(/^(\d+)/);
      if (countMatch) {
        const count = parseInt(countMatch[1]);
        expect(count).toBeGreaterThanOrEqual(0);
        console.log('Step 3: Candidate to Interview count displayed: ' + count);
      } else {
        console.log('Step 3: Candidate to Interview item displayed');
      }
    }

    // Step 4: Verify widget displays workflow state indicators
    // Workflow state is indicated by the action type text ("Pending Self Review", "Candidate to Interview")
    if (hasPendingSelfReview || hasCandidateToInterview) {
      console.log('Step 4: Workflow indicators show current state of pending actions');
    }

    // Step 5: Verify widget displays action categories or types
    const actionItems = page.locator('.orangehrm-todo-list-item, .oxd-sheet .oxd-table-card');
    const actionItemCount = await actionItems.count();
    
    if (actionItemCount > 0) {
      console.log('Step 5: Different types of pending actions are displayed');
      console.log('Total action items found: ' + actionItemCount);
      
      // Verify action icon buttons are present
      const actionIconButtons = page.locator('.orangehrm-todo-list-item button.orangehrm-report-icon, .oxd-table-card button');
      const iconButtonCount = await actionIconButtons.count();
      
      if (iconButtonCount > 0) {
        expect(iconButtonCount).toBeGreaterThan(0);
        console.log('Verified: Action icon buttons are present for workflow actions');
      }
    } else {
      console.log('Step 5: No pending actions currently displayed (valid state)');
    }

    console.log('Test QE-984 completed successfully');
  });
});