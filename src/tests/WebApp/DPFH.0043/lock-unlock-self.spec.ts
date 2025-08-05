import { test } from "@playwright/test";
import { Configuration } from "config/config";
import { App } from "pages/app";

const DPFH = "[DPFH.0043]";

test(`${DPFH} - Lock/Unlock Test Plan - Locked by user`, async () => {
  const config = Configuration.getConfiguration();
  const loginPage = await App.start();

  await loginPage
    .login()
    .navigateToTestPlansPage()
    .createTestPlan(
      `Auto Generated Test Plan #${Math.floor(Math.random() * 100000)}`
    )
    .assertIsLocked()
    .assertIsLockedByUser(config.getUsername())
    .unlock()
    .assertIsUnlocked()
    .lock()
    .assertIsLocked()
    .runSteps(); // Only awaited once here
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
