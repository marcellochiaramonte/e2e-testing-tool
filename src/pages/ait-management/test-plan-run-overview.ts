import { expect, Page } from "@playwright/test";
import { BasePage } from "common/base-page";
import { Step } from "common/types";
import { TestPlanRunDetail } from "./test-plan-run-detail";

export class TestPlanRunOverview extends BasePage {
  constructor(page: Page, steps: Array<Step>) {
    super(page, steps);
  }

  createTestPlanRun(): TestPlanRunDetail {
    this.steps.push(async () => {
      await this.page.getByTestId("add-testplan-result-button").click();
      await expect(
        this.page.getByTestId("testplan-title-search-input")
      ).toBeFocused();
      await this.page.getByTestId("testplan-title-search-input").fill("test");
      // there should be a list of test plans with the title "test". Select the first one from this mat autocomplete list

      // 2. Wait for mat-autocomplete panel to appear
      const panel = this.page.locator(".mat-autocomplete-panel");
      await expect(panel).toBeVisible();

      // 3. Get all option elements
      const options = panel.locator("mat-option");
      const count = await options.count();
      console.log(`Found ${count} options`);

      // 4. Select the first option
      await options.nth(0).click();

      // // Get the title of the test plan
      // const testPlanTitle = await options.nth(0).innerText();

      // console.log(`Test Plan Title: ${testPlanTitle}`);

      // // get text from the second input
      // const title = await this.page
      //   .getByTestId("testplan-result-title-text-input")
      //   .inputValue();
      // console.log(`Title: ${title}`);

      // // Assert that the value is the same as the test plan title appended by "Run"
      // await expect(title).toBe(`${testPlanTitle} Run`);

      // 5. Click the create button
      await this.page.getByTestId("testplan-result-create-button").click();
    });

    return new TestPlanRunDetail(this.page, this.steps);
  }
}
