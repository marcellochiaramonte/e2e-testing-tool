import { expect, Page } from "@playwright/test";
import { config } from "../config";

export const loginToMedicalPortal = async ({ page }: { page: Page }) => {
  await page.goto(config.baseUrl);

  await page.getByLabel("username").fill(config.credentials.username);

  await page.getByLabel("password").fill(config.credentials.password);

  await page.getByRole("button").click();

  await expect(page).toHaveURL(`${config.baseUrl}/pages/dashboard`);

  await expect(page).toHaveTitle("Hamilton Medical Portal");
};
