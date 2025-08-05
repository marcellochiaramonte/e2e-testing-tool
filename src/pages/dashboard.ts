import { expect, Page } from "@playwright/test";
import { BasePage } from "common/base-page";
import { Step } from "common/types";
import { TestPlanRunOverview } from "./ait-management/test-plan-run-overview";
import { TestPlans } from "./ait-management/test-plans";

export class DashboardPage extends BasePage {
  constructor(page: Page, steps: Array<Step>) {
    super(page, steps);
  }

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

  navigateToTestPlanRunPage(): TestPlanRunOverview {
    this.steps.push(async () => {
      await this.page.getByText("AIT Management").click();
      await this.page.getByText("Test Plan Run").click();
    });
    return new TestPlanRunOverview(this.page, this.steps);
  }
}
