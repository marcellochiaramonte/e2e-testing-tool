import { expect, Page } from "@playwright/test";
import { loginToMedicalPortal } from "./login";
import { Step } from "./test-plan2";

export class TestPlansFluent {
  constructor(private page: Page, private steps: Step[]) {
    this.steps = steps;
  }

  static async goToListOfTestPLans(page: Page) {
    await loginToMedicalPortal({ page });
    await page.getByText("AIT Management").click();
    await page.getByText("Test Plans").click();
  }

  static async createTestPlan(page: Page, title: string) {
    await page.getByTestId("add-test-plan-button").click();
    await page.getByTestId("create-test-plan-text-input").fill(title);
    await page.getByTestId("create-test-plan-create-button").click();
  }

  static async assertTestPlanHasTitle(page: Page, title: string) {
    // Assertions: where to place?
    expect(page.getByTestId("testplan-header-title")).toContainText(title);
  }
}
