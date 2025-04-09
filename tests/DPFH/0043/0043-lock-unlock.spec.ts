import { test } from "@playwright/test";
import { config } from "../../config";
import { LoginPage } from "../../objects/fluent-login";

const DPFH = "[DPFH.0043]";

// - Lock/Unlock Test Plans, Test Cases and Schedulings";

test(`${DPFH} - Lock/Unlock Test Plan - Locked by user`, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .goto()
    .enterUsername(config.credentials.username)
    .enterPassword(config.credentials.password)
    .submit()
    .assertLoggedIn()

    .navigateTo()
    .createTestPlan(
      `Auto Generated Test Plan #${Math.floor(Math.random() * 100000)}`
    )

    .assertIsLocked()
    .assertIsLockedByUser(config.credentials.username)
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
