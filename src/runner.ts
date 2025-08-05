import { Step } from "common/types";

export class Runner {
  static async run(steps: Array<Step>): Promise<void> {
    for (const step of steps) {
      await step();
    }
  }
}
