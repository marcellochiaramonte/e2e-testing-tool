import { expect, Page } from "@playwright/test";
import { config } from "../config";

export type Step = () => Promise<void>;

export class TestPlanFluent {
  constructor(private page: Page, private steps: Step[]) {
    this.steps = steps;
  }

  goto(): this {
    this.steps.push(async () => {
      await this.page.goto(config.baseUrl + "/apps/ait-mgmt/testPlans");
    });
    return this;
  }

  /**
   * Actions
   */
  lock() {
    this.steps.push(async () => {
      await this.page.getByTestId("lock-button").click();
    });
    return this;
  }

  unlock() {
    this.steps.push(async () => {
      await this.page.getByTestId("unlock-button").click();
    });
    return this;
  }

  /**
   * Assertions
   */
  assertIsUnlocked() {
    this.steps.push(async () => {
      await expect(this.page.getByTestId("unlocked-icon")).toBeVisible();
      await expect(this.page.getByTestId("locked-icon")).not.toBeVisible();
      await expect(this.page.getByTestId("test-plan-locked-by")).toContainText(
        "No one"
      );
    });
    return this;
  }

  assertIsLocked() {
    this.steps.push(async () => {
      await expect(this.page.getByTestId("locked-icon")).toBeVisible();
      await expect(this.page.getByTestId("unlocked-icon")).not.toBeVisible();
    });
    return this;
  }

  assertIsLockedByUser(username: string) {
    this.steps.push(async () => {
      await expect(this.page.getByTestId("test-plan-locked-by")).toContainText(
        username
      );
    });
    return this;
  }

  navigateTo() {
    this.steps.push(async () => {
      await this.page.getByText("AIT Management").click();
      await this.page.getByText("Test Plans").click();
    });
    return this;
  }

  wait(ms: number): this {
    this.steps.push(async () => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    });
    return this;
  }

  createTestPlan(title: string) {
    this.steps.push(async () => {
      await this.page.getByTestId("add-test-plan-button").click();
      await this.page.getByTestId("create-test-plan-text-input").fill(title);
      await this.page.getByTestId("create-test-plan-create-button").click();
    });
    return this;
  }

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step();
    }
    this.steps = []; // reset after run
  }
}
