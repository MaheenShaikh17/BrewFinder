const API_URL = "http://localhost:5000/api/admin/login";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.message || "Login failed"
            );
        }

loginMessage.textContent =
    "Login successful! Redirecting...";

loginMessage.style.color = "green";

// Save login status
sessionStorage.setItem("adminLoggedIn", "true");

setTimeout(() => {
    window.location.href = "admin.html";
}, 800);


    } catch (error) {

        console.error("Login error:", error);

        loginMessage.textContent =
            error.message;

        loginMessage.style.color = "red";

    }

});