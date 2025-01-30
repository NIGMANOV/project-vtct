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

export { displayStudents, displayPagination };

function displayStudents(students = []) {
  const pageItem = document.getElementById("page-item");
  if (pageItem) {
    pageItem.innerHTML = ``;

    students.forEach((student) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `                
            <div class="col">
                <div class="card h-100">
                    <img src="https://avatars.mds.yandex.net/get-ydo/472106/2a00000174a0bab24e919b669269cf3e4838/diploma" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${student.lastname} ${student.name} ${student.fathername}</h5>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Date of Birth</span> ${student.dateofBirth}</p>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Gender:</span> ${student.gender}</p>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Territory:</span> ${student.territory}</p>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Phone Number:</span> ${student.phoneNumber}</p>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Email:</span> ${student.email}</p>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Passport Seria:</span> ${student.passportSeria}</p>
                      <p class="card-text"><span class="text-bg-primary rounded-1 p-1">Passport Number:</span> ${student.passportNumber}</p>
                    </div>
                <div>
            </div>`;
      pageItem.appendChild(itemDiv);
    });
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
