import { expect, Page } from "@playwright/test";

import { Step } from "common/types";
import { TestPlan } from "./test-plan";

export class TestPlans {
  constructor(private page: Page, private steps: Array<Step>) {
    this.steps = steps;
  }

  goToListOfTestPlans(): TestPlans {
    this.steps.push(async () => {
      await this.page.getByText("AIT Management").click();
      await this.page.getByText("Test Plans").click();
    });
    return this;
  }

  createTestPlan(title: string): TestPlan {
    this.steps.push(async () => {
      await this.page.getByTestId("add-test-plan-button").click();
      await this.page.getByTestId("create-test-plan-text-input").fill(title);
      await this.page.getByTestId("create-test-plan-create-button").click();
    });
    return new TestPlan(this.page, this.steps);
  }

  assertTestPlanHasTitle(title: string): TestPlans {
    this.steps.push(async () => {
      await expect(
        this.page.getByTestId("testplan-header-title")
      ).toContainText(title);
    });
    return this;
  }

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step();
    }
    this.steps = [];
  }
}
