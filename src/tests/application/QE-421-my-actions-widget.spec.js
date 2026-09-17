const { test, expect } = require('@playwright/test');
const OrangeHRMLoginPage = require('../../pages/OrangeHRMLoginPage');
const OrangeHRMDashboardPage = require('../../pages/OrangeHRMDashboardPage');
const TD = require('../../data/orangehrm-test-data');

test.describe('[QE-421] Verify My Actions widget displays pending work items and workflow state', { tag: ['@smoke', '@regression'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[QE-421] Verify My Actions widget displays pending work items and workflow state correctly', async ({ page }) => {
    loginPage = new OrangeHRMLoginPage(page);
    dashboardPage = new OrangeHRMDashboardPage(page);

    await loginPage.goto();
    expect(await loginPage.isLoginPageDisplayed()).toBe(true);

    await loginPage.login(TD.credentials.username, TD.credentials.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 60000 });
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
    expect(await dashboardPage.isDashboardDisplayed()).toBe(true);

    await expect(dashboardPage.isMyActionsWidgetVisible()).resolves.toBe(true);

    const isPendingSelfReviewVisible = await dashboardPage.isPendingSelfReviewVisible();
    const isCandidateToInterviewVisible = await dashboardPage.isCandidateToInterviewVisible();

    if (isPendingSelfReviewVisible) {
      const pendingText = await dashboardPage.getPendingSelfReviewText();
      expect(pendingText).toContain('Pending Self Review');
      const count = await dashboardPage.extractNumericCount(pendingText);
      expect(count).toBeGreaterThanOrEqual(TD.countRanges.min);
      expect(Number.isInteger(count)).toBe(true);
    }

    if (isCandidateToInterviewVisible) {
      const candidateText = await dashboardPage.getCandidateToInterviewText();
      expect(candidateText).toContain('Candidate to Interview');
      const count = await dashboardPage.extractNumericCount(candidateText);
      expect(count).toBeGreaterThanOrEqual(TD.countRanges.min);
      expect(Number.isInteger(count)).toBe(true);
    }
  });
});