export default function addStudents() {
    const addStudentsForm = document.getElementById("add-students");
  
    if (addStudentsForm) {
      addStudentsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const fathername = document.getElementById("fathername").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const dateofBirth = document.getElementById("dateofBirth").value;
        const territory = document.getElementById("territory").value;
        const passportSeria = document.getElementById("passportSeria").value;
        const passportNumber = document.getElementById("passportNumber").value;

  
        const genderElement = document.querySelector('select[name="gender"]');
        const selectedOptionGender = genderElement ? genderElement.options[genderElement.selectedIndex] : null;
        const gender = selectedOptionGender ? selectedOptionGender.value : null;

        const selectElement = document.querySelector('select[name="selectDirections"]');
        const selectedOption = selectElement ? selectElement.options[selectElement.selectedIndex] : null;
        const selectDirections = selectedOption ? selectedOption.value : null;
        
        try {
          const response = await fetch("http://localhost:5550/api/students", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              'Authorization' : 'Beror ' + localStorage.getItem('key') 
            },
            body: JSON.stringify({ email, name, lastname, fathername, gender, passportNumber, passportSeria, phoneNumber, territory, dateofBirth, selectDirections }),
          });
  
          const result = await response.json();
          if (response.ok) {
            alert("Student created successfully");
          } else {
            alert("Error: " + result.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  }
  