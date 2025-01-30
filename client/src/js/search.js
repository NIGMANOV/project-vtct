import { displayStudents } from "./searchStudents";

export default async function search() {
  try {
    const inputElement = document.getElementById("search-input");

    const searchStudents = async (value) => {
      const response = await fetch(
        `http://localhost:5550/api/students/search?&email=${value.trim()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    };

    inputElement.addEventListener("input", async (e) => {
      const { target } = e;
      const { value } = target;

      const result = await searchStudents(value);

      const pageItem = document.getElementById("page-item");

      if (!pageItem) {
        return;
      }

      pageItem.innerHTML = ``;

      if (result && result.data) {
        displayStudents(result.data);
      }
    });
  } catch (error) {}
}
