export default function initAuthorization() {
  const authorizationForm = document.getElementById("form-authorization");
  if (authorizationForm) {
    authorizationForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:5500/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Logged in successfully");
          window.location.href = "../dist/index.html";
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
}
