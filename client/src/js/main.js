import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import initRegistration from "./registration";
import initAuthorization from "./authorization";
import btnExit from "./btnexit";
import addStudents from "./addstudents";
document.addEventListener("DOMContentLoaded", () => {
  initRegistration();
  initAuthorization()
  btnExit()
  addStudents()
});
