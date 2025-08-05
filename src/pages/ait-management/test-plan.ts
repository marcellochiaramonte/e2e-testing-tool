import { expect, Page } from "@playwright/test";
import { BasePage } from "common/base-page";
import { Step } from "common/types";

export class TestPlan extends BasePage {
  constructor(page: Page, steps: Array<Step>) {
    super(page, steps);
  }

  /**
   * Actions
   */

  navigateTo() {
    this.steps.push(async () => {
      await this.page.getByText("AIT Management").click();
      await this.page.getByText("Test Plans").click();
    });
    return this;
  }

  lock(): TestPlan {
    this.steps.push(async () => {
      await this.page.getByTestId("lock-button").click();
    });
    return this;
  }

  unlock(): TestPlan {
    this.steps.push(async () => {
      await this.page.getByTestId("unlock-button").click();
    });
    return this;
  }

  /**
   * Assertions
   */
  assertIsUnlocked(): TestPlan {
    this.steps.push(async () => {
      await expect(this.page.getByTestId("unlocked-icon")).toBeVisible();
      await expect(this.page.getByTestId("locked-icon")).not.toBeVisible();
      await expect(this.page.getByTestId("test-plan-locked-by")).toContainText(
        "No one"
      );
    });
    return this;
  }

  assertIsLocked(): TestPlan {
    this.steps.push(async () => {
      await expect(this.page.getByTestId("locked-icon")).toBeVisible();
      await expect(this.page.getByTestId("unlocked-icon")).not.toBeVisible();
    });
    return this;
  }

  assertIsLockedByUser(username: string): TestPlan {
    this.steps.push(async () => {
      await expect(this.page.getByTestId("test-plan-locked-by")).toContainText(
        username
      );
    });
    return this;
  }

  waitMs(ms: number): TestPlan {
    this.steps.push(async () => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    });
    return this;
  }
}
