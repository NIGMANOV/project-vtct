import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import initRegistration from "./registration";
import initAuthorization from "./authorization";
import btnExit from "./btnexit";
import addStudents from "./addstudents";
import searchStudents from "./searchStudents"
import search from "./search"
import getExcel from './excel'

const checkAuth = async (token) => {
  try {
    const response = await fetch("http://localhost:5550/api/users/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    if (
      response.status !== 200 &&
      window.location.href === "http://127.0.0.1:5500/client/dist/searchStudents.html"
    ) {
      window.location.href = "./authorization.html";
    }
  } catch (error) {}
};

document.addEventListener("DOMContentLoaded", () => {
  const isLogged = localStorage.getItem("key");

  checkAuth(isLogged);

  if (isLogged) {
    btnExit();
    addStudents();
    searchStudents()
    search()
    getExcel()
  }

  initRegistration();
  initAuthorization();
});
