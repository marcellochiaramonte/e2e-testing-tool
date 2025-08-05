import { test } from "@playwright/test";
import { App } from "pages/app";

test("fluent login works", async () => {
  const loginPage = await App.start();
  await loginPage.navigateTo().login().runSteps();
});
