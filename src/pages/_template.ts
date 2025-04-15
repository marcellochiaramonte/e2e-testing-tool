import { Page } from "@playwright/test";
import { Step } from "common/types";

export class TemplatePage {
  constructor(private page: Page, private steps: Array<Step>) {}

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step();
    }
    this.steps = []; // reset after run
  }
}
