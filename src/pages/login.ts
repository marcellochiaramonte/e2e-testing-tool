import { Page } from "@playwright/test";

import { BasePage } from "common/base-page";
import { Step } from "common/types";
import { Configuration } from "config/config";
import { Credentials } from "config/credentials";
import { DashboardPage } from "./dashboard";

export class LoginPage extends BasePage {
  private config: Configuration;

  constructor(page: Page, steps: Array<Step>) {
    super(page, steps);
    this.config = Configuration.getConfiguration();
  }

  navigateTo(): this {
    this.steps.push(async () => {
      await this.page.goto(this.config.getBaseUrl());
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

  login(credentials?: Credentials): DashboardPage {
    return this.navigateTo()
      .enterUsername(credentials?.username ?? this.config.getUsername())
      .enterPassword(credentials?.password ?? this.config.getPassword())
      .submit()
      .assertUserIsLoggedIn();
  }
}
