import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { PatientsPage } from "../pages/patientspage";

test("Login and validate patient list rendering + selection + new patient page", async ({ page }) => {

  const login = new LoginPage(page);
  const patients = new PatientsPage(page);


  await login.open();
  await login.enterEmail("allwin106vino@gmail.com");
  await login.enterPassword("AllWin@01");

 
  await patients.navigateToPatients();


  await patients.verifyPatientList();

  await patients.verifyPatientSelection();


  await patients.openNewPatientForm();
  
});
