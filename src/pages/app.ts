import { chromium } from "@playwright/test";
import { LoginPage } from "./login";

export class App {
  static async start(): Promise<LoginPage> {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    return new LoginPage(page, []);
  }
}
