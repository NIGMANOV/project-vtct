export default function getExcel() {
  const btnExcel = document.getElementById("btn-excel");

  if (!btnExcel) {
    console.error("Кнопка btn-excel не найдена");
    return;
  }

  btnExcel.addEventListener("click", () => {
    window.location.href = "http://localhost:5550/api/students/export";
  });
}
