import { displayStudents } from "./searchStudents";

export default async function status() {
  try {
    const statusStudent = document.getElementById("status-student");
    const totalCount = document.querySelector(".total");

    const statusStudents = async (value = "all") => {
      try {
        const response = await fetch(
          `http://localhost:5550/api/students/getAll?status=${value}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          }
        );
        if (!response.ok) throw new Error("Ошибка при загрузке данных");
        return await response.json();
      } catch (error) {
        console.error("Ошибка запроса:", error);
        return;
      }
    };

    const total = await statusStudents();

    if (total && total.data) {
      const counts = {
        Studies: 0,
        Graduated: 0,
        Expelled: 0,
      };

      total.data.forEach((item) => {
        if (counts[item.status] !== undefined) {
          counts[item.status]++;
        }
      });

      if (totalCount) {
        totalCount.innerHTML = `
            <div class="d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
              </svg>
              <p class="mb-0">Studies: ${counts.Studies}</p>
            </div>
            <div class="d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg>
              <p class="mb-0">Graduated: ${counts.Graduated}</p>
            </div>
            <div class="d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
              </svg>
              <p class="mb-0">Expelled: ${counts.Expelled}</p>
            </div>
        `;
      }
    }

    if (statusStudent) {
      statusStudent.addEventListener("change", async (e) => {
        const { value } = e.target;

        const getStatus = await statusStudents(value);
        const pageItem = document.getElementById("page-item");

        if (!pageItem) return;

        pageItem.innerHTML = ``;

        if (getStatus?.data) {
          displayStudents(getStatus.data);
        }
      });
    }
  } catch (error) {
    console.error("Ошибка выполнения:", error);
  }
}
