import { test } from "@playwright/test";
import { configuration } from "config/config";
import { LoginPage } from "pages/login";

const DPFH = "[DPFH.0043]";

// - Lock/Unlock Test Plans, Test Cases and Schedulings";

test(`${DPFH} - Lock/Unlock Test Plan - Locked by user`, async ({ page }) => {
  const app = new LoginPage(page, []);

  await app
    .login(configuration.getCredentials())
    .navigateToTestPlansPage()
    .createTestPlan(
      `Auto Generated Test Plan #${Math.floor(Math.random() * 100000)}`
    )
    .assertIsLocked()
    .assertIsLockedByUser(configuration.getCredentials().username)
    .unlock()
    .assertIsUnlocked()
    .lock()
    .assertIsLocked()
    .run(); // Only awaited once here
});

// test(dpfhCase + " - Test Plans", async ({ page }) => {
//   await TestPlans.goToListOfTestPLans(page);

//   const testPlanTitle = `Auto Generated Test Plan #${Math.floor(
//     Math.random() * 10000000
//   )}`;

//   await TestPlans.createTestPlan(page, testPlanTitle);

//   await TestPlan.assertHasTitle(page, testPlanTitle);

//   await TestPlan.assertIsLocked(page);
//   await TestPlan.assertIsLockedByUser(page, config.credentials.username);

//   await TestPlan.unlock(page);
//   await TestPlan.assertIsUnlocked(page);

//   await TestPlan.lock(page);
//   await TestPlan.assertIsLocked(page);
//   await TestPlan.assertIsLockedByUser(page, config.credentials.username);

//   await page.screenshot();
// });
