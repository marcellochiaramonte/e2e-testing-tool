import { Page } from "@playwright/test";
import { BasePage } from "common/base-page";
import { Step } from "common/types";

export class TestPlanRunDetail extends BasePage {
  constructor(page: Page, steps: Array<Step>) {
    super(page, steps);
  }
}
