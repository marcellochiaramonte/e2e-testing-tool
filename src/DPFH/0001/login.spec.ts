import { test } from "@playwright/test";
import { configuration } from "config/config";
import { LoginPage } from "pages/login";

test("fluent login works", async ({ page }) => {
  const loginPage = new LoginPage(page, []);

  await loginPage
    .navigateTo()
    .enterUsername(configuration.getCredentials().username)
    .enterPassword(configuration.getCredentials().password)
    .submit()
    .run(); // Only awaited once here
});
