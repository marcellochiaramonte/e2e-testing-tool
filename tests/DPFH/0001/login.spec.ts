import { test } from "@playwright/test";
import { config } from "../../config";
import { LoginPage } from "../../objects/fluent-login";

test("fluent login works", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .goto()
    .enterUsername(config.credentials.username)
    .enterPassword(config.credentials.password)
    .submit()
    .run(); // Only awaited once here
});
