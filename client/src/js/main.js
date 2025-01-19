import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import initRegistration from "./registration";
import initAuthorization from "./authorization";
document.addEventListener("DOMContentLoaded", () => {
  initRegistration();
  initAuthorization()
});
