import { expect, Page } from "@playwright/test";
import { config } from "../config";
import { TestPlanFluent } from "./test-plan2";

type Step = () => Promise<void>;

export class LoginPage {
  private steps: Step[] = [];

  constructor(private page: Page) {}

  goto(): this {
    this.steps.push(async () => {
      await this.page.goto(config.baseUrl);
    });
    return this;
  }

  enterUsername(username: string): this {
    this.steps.push(async () => {
      await this.page.getByLabel("username").fill(username);
    });
    return this;
  }

  enterPassword(password: string): this {
    this.steps.push(async () => {
      await this.page.getByLabel("password").fill(password);
    });
    return this;
  }

  submit(): this {
    this.steps.push(async () => {
      await this.page.getByRole("button").click();
    });
    return this;
  }

  assertLoggedIn(): TestPlanFluent {
    this.steps.push(async () => {
      await expect(this.page).toHaveURL(`${config.baseUrl}/pages/dashboard`);
      await expect(this.page).toHaveTitle("Hamilton Medical Portal");
    });
    return new TestPlanFluent(this.page, this.steps);
  }

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step();
    }
    this.steps = []; // reset after run
  }
}
