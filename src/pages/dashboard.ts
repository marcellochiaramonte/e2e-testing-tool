import { expect, Page } from "@playwright/test";
import { Step } from "common/types";
import { TestPlans } from "./test-plans";

export class DashboardPage {
  constructor(private page: Page, private steps: Array<Step>) {}

  assertUserIsLoggedIn(): DashboardPage {
    this.steps.push(async () => {
      await expect(this.page).toHaveTitle("Hamilton Medical Portal");
      // check for the logged in user on user menu
      // check if logo exists, etc
    });
    return this;
  }

  navigateToTestPlansPage(): TestPlans {
    this.steps.push(async () => {
      // check if sidebar is open
      await this.page.getByText("AIT Management").click();
      await this.page.getByText("Test Plans").click();
    });
    return new TestPlans(this.page, this.steps);
  }

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step();
    }
    this.steps = []; // reset after run
  }
}
