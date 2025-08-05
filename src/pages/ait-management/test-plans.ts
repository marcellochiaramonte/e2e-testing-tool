import { expect, Page } from "@playwright/test";

import { Step } from "common/types";
import { TestPlan } from "./test-plan";

export class TestPlans {
  constructor(private page: Page, private steps: Array<Step>) {
    this.steps = steps;
  }

  goToListOfTestPlans(): TestPlans {
    this.steps.push(
      this.page.getByText("AIT Management").click(),
      this.page.getByText("Test Plans").click()
    );
    return this;
  }

  createTestPlan(title: string): TestPlan {
    this.steps.push(
      this.page.getByTestId("add-test-plan-button").click(),
      this.page.getByTestId("create-test-plan-text-input").fill(title),
      this.page.getByTestId("create-test-plan-create-button").click()
    );
    return new TestPlan(this.page, this.steps);
  }

  assertTestPlanHasTitle(title: string): TestPlans {
    this.steps.push(
      expect(this.page.getByTestId("testplan-header-title")).toContainText(
        title
      )
    );
    return this;
  }
}
