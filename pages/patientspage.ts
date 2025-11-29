import { expect, Page, Locator } from "@playwright/test";

export class PatientsPage {
  readonly page: Page;
  readonly patientCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patientCards = page.locator("div.border-gray-100.rounded-2xl.cursor-pointer");
  }


  async navigateToPatients() {
    await this.page.getByText("Patients", { exact: true }).click();
    await expect(this.page).toHaveURL(/.*patients/);


    await expect(this.patientCards.first()).toBeVisible({ timeout: 15000 });
  }

  async verifyPatientList() {
    const count = await this.patientCards.count();
    expect(count).toBeGreaterThan(0);

    console.log(`Total patients found: ${count}`);

    for (let i = 0; i < count; i++) {
      const card = this.patientCards.nth(i);

      const initials = card.locator("span.text-lg.font-semibold");
      const name = card.locator("h3.font-medium.text-black");

      await expect(initials).toBeVisible();
      await expect(name).toBeVisible();

      const initialsText = (await initials.textContent())?.trim();
      const nameText = (await name.textContent())?.trim();

      console.log(`Patient ${i + 1}:`);
      console.log(`  Initials: ${initialsText}`);
      console.log(`  Name: ${nameText}`);
    }
  }


  async verifyPatientSelection() {
    const firstCard = this.patientCards.first();

    const listNameLocator = firstCard.locator("h3.font-medium.text-black");
    await expect(listNameLocator).toBeVisible();

    const listName = (await listNameLocator.innerText()).replace(/\s+/g, " ").trim();
    console.log("Name from list:", listName);

    await firstCard.click();

 
    const detailsNameLocator = this.page.locator(
      "//p[normalize-space()='Name']/following-sibling::p[1]"
    );

    await expect(detailsNameLocator).toBeVisible({ timeout: 15000 });

    const detailsPanelName = (await detailsNameLocator.innerText())
      .replace(/\s+/g, " ")
      .trim();

    console.log("Name shown on details panel:", detailsPanelName);

    expect(detailsPanelName).toBe(listName);
  }

 async openNewPatientForm() {

  await this.page.getByRole("button", { name: "New Patient" }).click();


  const modalTitle = this.page.getByRole("heading", { name: "Create New Patient" });

  await expect(modalTitle).toBeVisible({ timeout: 10000 });

  console.log("✔ New Patient popup opened successfully");
}

}
