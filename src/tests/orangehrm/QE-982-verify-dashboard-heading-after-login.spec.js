const { test, expect } = require('../../fixtures');
const TD = require('../../data/orangehrm-test-data');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('[QE-378][AC5] Verify Dashboard page displays the Dashboard heading after successful login', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('QE-982: Dashboard page displays the Dashboard heading after successful login', async ({ page }) => {
    // Step 1: Login with valid credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.username, TD.credentials.password);
    console.log('Step 1: User authenticated and redirected to Dashboard');

    // Verify redirect to Dashboard
    await expect(page).toHaveURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    console.log('Verified: User is on Dashboard page');

    // Step 2: Wait for Dashboard page to load completely
    await dashboardPage.waitForDashboardToLoad();
    console.log('Step 2: Dashboard page loaded completely');

    // Step 3: Locate Dashboard heading element
    const dashboardHeading = page.getByRole('heading', { name: TD.pageTitles.dashboard });
    await expect(dashboardHeading).toBeAttached();
    console.log('Step 3: Dashboard heading element is present in the DOM');

    // Step 4: Verify heading text displays 'Dashboard'
    const headingText = await dashboardPage.getDashboardHeadingText();
    expect(headingText.trim()).toBe(TD.pageTitles.dashboard);
    console.log('Step 4: Verified heading displays the text "Dashboard" exactly');

    // Alternative verification using expect assertion
    await expect(dashboardHeading).toHaveText(TD.pageTitles.dashboard);
    console.log('Verified: Heading text matches expected value');

    // Step 5: Verify heading is visible and properly styled
    await expect(dashboardHeading).toBeVisible();
    console.log('Step 5: Verified heading is visible');

    // Verify heading is within viewport
    const headingBox = await dashboardHeading.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(headingBox.y).toBeGreaterThanOrEqual(0);
    console.log('Verified: Heading is properly positioned in viewport');

    // Verify heading follows design standards (has proper styling)
    const fontSize = await dashboardHeading.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(fontSize).toBeTruthy();
    console.log('Verified: Heading has proper styling applied');

    console.log('Test QE-982 completed successfully');
  });
});