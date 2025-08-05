import { test } from "@playwright/test";
import { App } from "pages/app";
import { DPFH } from "../DPFH";

test(`${DPFH["0008"]} - Check functionality of filters`, async () => {
  const loginPage = await App.start();

  await loginPage.login().navigateToTestPlansPage().runSteps();
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
