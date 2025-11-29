import { expect, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("https://auth-dev.ekkomd.com/u/login/identifier?state=hKFo2SBBakpoemlnZXRybndZN19aTl9MTE5ZRmRWQTFQbk9td6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHhCendMY3ZxbWFMcHU1RGJWcUZSQXFWVGNsdEJ1MTZfo2NpZNkgdW1hNmtHOTk1THFMYzUwdjB6bVkyenZTbmhYbG15MnY");
  }

  async enterEmail(email: string) {
    const emailInput = this.page.locator('input[name="username"]');
    const continueBtn = this.page.getByRole("button", { name: "Continue", exact: true });

    await expect(emailInput).toBeVisible();
    await emailInput.fill(email);

    await Promise.all([
      this.page.waitForSelector('input[name="password"]'),  
      continueBtn.click(),
    ]);
  }

  async enterPassword(password: string) {
    const passwordInput = this.page.locator('input[name="password"]');
    const continueBtn = this.page.getByRole("button", { name: "Continue", exact: true });

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);

    await Promise.all([
      this.page.waitForURL("**/visits"),  
      continueBtn.click(),
    ]);
  }
}
