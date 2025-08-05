import { test } from "@playwright/test";
import { App } from "pages/app";

test(`DPFH.0094 - Export Test Report Dokumentation`, async () => {
  const app = await App.start();

  await app.login().navigateToTestPlanRunPage().createTestPlanRun().runSteps();
});
