export default async function fetchData(page = 1) {
  try {
    const response = await fetch(
      `http://localhost:5550/api/students/getAll?page=${page}&limit=9`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных");
  }
}

function displayStudents(students = []) {
  const pageItem = document.getElementById("page-item");
  if (pageItem) {
    pageItem.innerHTML = ``;

    students.forEach((student, index) => {
      console.log(student, index);

      let itemHtml = `
        <div class="col-12">
          <div class="row border border-opacity-25 border-black rounded p-3 align-items-center mt-3 d-flex">
            <!-- Profile Image -->
            <div class="col-auto d-flex align-items-center">
              <img
                class="border border-opacity-25 border-black rounded img-fluid"
                src="${
                  student.avatar
                    ? `http://localhost:5550/uploads/${student.avatar}`
                    : "https://www.healthdirect.gov.au/assets/images/gender-male.png"
                }"
                alt="Profile picture"
              />
            </div>
    
            <!-- Personal Information -->
            <div class="col d-flex flex-column align-items-start">
              <p><strong>Full Name:</strong> ${student.lastname} ${
        student.name
      } ${student.fathername} </p>
              <p><strong>Gender:</strong> ${student.gender} </p>
              <p><strong>Territory:</strong> ${student.territory} </p>
            </div>
    
            <!-- Passport Information -->
            <div class="col d-flex flex-column align-items-start">
              <p><strong>Chosen Direction:</strong> ${
                student.selectDirections
              } </p>
              <p><strong>Passport Series:</strong> ${student.passportSeria} </p>
              <p><strong>Passport Number:</strong> ${
                student.passportNumber
              } </p>
            </div>
    
            <!-- Contact Information -->
            <div class="col d-flex flex-column align-items-start">
              <p><strong>Phone Number:</strong> ${student.phoneNumber} </p>
              <p><strong>Email:</strong> ${student.email} </p>
              <p><strong>Status:</strong> ${student.status} </p>
            </div>
            
            <!-- Buttons -->
            <div class="col-2 d-flex flex-column gap-2">
              <button class="btn btn-primary update-status" data-id="${
                student._id
              }" value="Graduated">Graduated</button>
              <button class="btn btn-success update-status" data-id="${
                student._id
              }" value="Studies">Studies</button>
              <button class="btn btn-danger update-status" data-id="${
                student._id
              }" value="Expelled">Expelled</button>
            </div>
          </div>
        </div>
      `;
      pageItem.insertAdjacentHTML("beforeend", itemHtml);
    });

    async function updateStatus() {
      try {
        const buttons = document.querySelectorAll(".update-status");

        const update = async (id, newStatus) => {
          const response = await fetch(
            `http://localhost:5550/api/students/${id}/status`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("key")}`,
              },
              body: JSON.stringify({ status: newStatus }),
            }
          );

          const result = await response.json();
          console.log("Ответ сервера:", result);

          location.reload();
        };

        if (buttons.length > 0) {
          buttons.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
              const id = e.target.dataset.id; 
              const newStatus = e.target.value; 

              if (id && newStatus) {
                await update(id, newStatus); 
              } else {
                console.error(
                  "Ошибка: Не хватает данных для обновления статуса"
                );
              }
            });
          });
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
    updateStatus();
  }
}

function displayPagination(totalCount, limit, page) {
  const totalPages = Math.ceil(totalCount / limit);

  const paginationList = document.getElementById("pagination");

  if (paginationList) {
    let paginationItems = `<li class="page-item">
  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
</li>`;
    for (let index = 1; index <= totalPages; index++) {
      paginationItems += `<li class="page-item ${
        index == page && "active"
      }" aria-current="page"><a class="page-link" href="#">${index}</a></li>`;
      console.log(index, page);
    }
    paginationItems += `
<li class="page-item">
<a class="page-link" href="#">Next</a>
</li>`;
    paginationList.innerHTML = "";
    paginationList.insertAdjacentHTML("beforeend", paginationItems);

    paginationList.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", (e) => {
        const { target } = e;
        const { innerText } = target;
        console.log(innerText);

        let page = 1;
        if (innerText === "Previous") {
          if (page > 1) {
            page--;
          }
        } else if (innerText === "Next") {
          if (page < totalPages) {
            page++;
          }
        } else {
          page = innerText;
        }
        console.log(page);

        displayData(page);
      });
    });
  }
}

async function displayData(page = 1) {
  const getData = await fetchData(page);
  displayStudents(getData.data);
  displayPagination(getData.totalCount, getData.limit, getData.page);
}

displayData();

export { displayStudents, displayPagination };
