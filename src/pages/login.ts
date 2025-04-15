import { Page } from "@playwright/test";

import { Step } from "common/types";
import { configuration, Credentials } from "config/config";
import { DashboardPage } from "./dashboard";

export class LoginPage {
  constructor(private page: Page, private steps: Array<Step>) {}

  navigateTo(): this {
    this.steps.push(async () => {
      await this.page.goto(configuration.getBaseUrl());
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

  submit(): DashboardPage {
    this.steps.push(async () => {
      await this.page.getByRole("button").click();
    });
    return new DashboardPage(this.page, this.steps);
  }

  login(credentials: Credentials): DashboardPage {
    return this.navigateTo()
      .enterUsername(credentials.username)
      .enterPassword(credentials.password)
      .submit()
      .assertUserIsLoggedIn();
  }

  async run(): Promise<void> {
    for (const step of this.steps) {
      await step();
    }
    this.steps = []; // reset after run
  }
}
