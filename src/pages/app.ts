import { Page } from "@playwright/test";
import { LoginPage } from "./login";

export class App {
  static getInstance(page: Page): LoginPage {
    return new LoginPage(page, []);
  }
}
