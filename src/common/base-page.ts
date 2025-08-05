import { Page } from "@playwright/test";
import { Step } from "./types";

export class BasePage {
  constructor(protected page: Page, protected steps: Array<Step>) {}

  async runSteps(): Promise<void> {
    console.log(`Executing ${this.steps.length} steps...`);
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      try {
        console.log(`Executing step ${i + 1}/${this.steps.length}`);
        await step();
      } catch (error) {
        console.error(`Step ${i + 1} failed:`, error);
        throw error;
      }
    }
    console.log("All steps completed successfully");
    this.steps = [];
  }
}
