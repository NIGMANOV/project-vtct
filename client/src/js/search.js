import { displayStudents } from "./searchStudents";

export default async function search() {
  try {
    const inputElement = document.querySelectorAll("#search-input");

    const searchStudents = async (value, name) => {
      const response = await fetch(
        `http://localhost:5550/api/students/search?&${name}=${value}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        }
      );
      const result = await response.json();
      return result;
    };

    inputElement.forEach((item) => {
      item.addEventListener('input', async (e) => {
        const {target} = e
        const {value} = target
        const {name} = target
        
        const result = await searchStudents(value, name);

        const pageItem = document.getElementById("page-item");
  
        if (!pageItem) {
          return;
        }
  
        pageItem.innerHTML = ``;
  
        if (result && result.data) {
          displayStudents(result.data);
        }
      })
    })
  } catch (error) {}
}
