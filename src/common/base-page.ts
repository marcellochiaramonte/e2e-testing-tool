import { Page } from "@playwright/test";
import { Step } from "./types";

export class BasePage {
  constructor(protected page: Page, protected steps: Array<Step>) {}

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step;
    }
    this.steps = [];
  }
}
