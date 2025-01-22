export default function initRegistration() {
  const registerForm = document.getElementById("register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullname = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("http://localhost:5550/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, email, password }),
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          window.location.href = "./authorization.html";
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
}
