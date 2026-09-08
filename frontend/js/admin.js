// =========================
// ADMIN ACCESS CHECK
// =========================

if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}
const API_URL = "http://localhost:5000/api/places";

const placeForm = document.getElementById("placeForm");
const placesTableBody = document.getElementById("placesTableBody");
const formMessage = document.getElementById("formMessage");
const refreshBtn = document.getElementById("refreshBtn");


// =========================
// LOAD PLACES
// =========================

async function loadPlaces() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load places");
        }

        const places = await response.json();

        displayPlaces(places);

    } catch (error) {

        console.error("Error:", error);

        placesTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    Unable to load places.
                    Make sure the backend server is running.
                </td>
            </tr>
        `;
    }
}


// =========================
// DISPLAY PLACES
// =========================

function displayPlaces(places) {

    if (places.length === 0) {

        placesTableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No places found.
                </td>
            </tr>
        `;

        return;
    }


    placesTableBody.innerHTML = places.map(place => {

        return `
            <tr>

                <td>${place.id}</td>

                <td>${place.name}</td>

                <td>${place.type}</td>

                <td>${place.category || "-"}</td>

                <td>${place.location}</td>

                <td>⭐ ${place.rating || "-"}</td>

                <td>${place.reviews || 0}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editPlace(${place.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deletePlace(${place.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;

    }).join("");
}


// =========================
// ADD PLACE
// =========================

placeForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const placeData = {

        name: document.getElementById("name").value,

        type: document.getElementById("type").value,

        category: document.getElementById("category").value,

        location: document.getElementById("location").value,

        city: document.getElementById("city").value,

        rating: Number(document.getElementById("rating").value),

        reviews: Number(document.getElementById("reviews").value),

        image: document.getElementById("image").value

    };


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(placeData)

        });


        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.message || "Failed to add place");
        }


        formMessage.textContent = "Place added successfully!";

        formMessage.style.color = "green";


        placeForm.reset();

        document.getElementById("city").value = "Hyderabad";


        loadPlaces();


    } catch (error) {

        console.error("Error:", error);

        formMessage.textContent = error.message;

        formMessage.style.color = "red";
    }

});


// =========================
// DELETE PLACE
// =========================

async function deletePlace(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this place?"
    );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.message || "Failed to delete place");
        }


        alert("Place deleted successfully!");

        loadPlaces();


    } catch (error) {

        console.error("Error:", error);

        alert(error.message);
    }
}


// =========================
// EDIT PLACE
// =========================

// =========================
// EDIT PLACE
// =========================

async function editPlace(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Place not found");
        }

        const place = await response.json();


        // Fill edit form

        document.getElementById("editId").value = place.id;
        document.getElementById("editName").value = place.name;
        document.getElementById("editType").value = place.type;
        document.getElementById("editCategory").value = place.category || "";
        document.getElementById("editLocation").value = place.location;
        document.getElementById("editCity").value = place.city || "";
        document.getElementById("editRating").value = place.rating || "";
        document.getElementById("editReviews").value = place.reviews || 0;
        document.getElementById("editImage").value = place.image || "";


        // Show modal

        document.getElementById("editModal").style.display = "flex";


    } catch (error) {

        console.error("Error:", error);

        alert(error.message);

    }
}



// =========================
// REFRESH
// =========================

refreshBtn.addEventListener("click", () => {

    loadPlaces();

});


// =========================
// INITIAL LOAD
// =========================

loadPlaces();

// =========================
// EDIT FORM SUBMIT
// =========================

const editForm = document.getElementById("editForm");

editForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = document.getElementById("editId").value;


    const updatedPlace = {

        name: document.getElementById("editName").value,

        type: document.getElementById("editType").value,

        category: document.getElementById("editCategory").value,

        location: document.getElementById("editLocation").value,

        city: document.getElementById("editCity").value,

        rating: Number(
            document.getElementById("editRating").value
        ),

        reviews: Number(
            document.getElementById("editReviews").value
        ),

        image: document.getElementById("editImage").value

    };


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedPlace)
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.message || "Failed to update place"
            );
        }


        alert("Place updated successfully!");


        // Close modal

        document.getElementById("editModal").style.display = "none";


        // Reload table

        loadPlaces();


    } catch (error) {

        console.error("Error:", error);

        alert(error.message);

    }

});


// Close edit modal

document.getElementById("closeEditModal")
    .addEventListener("click", () => {

        document.getElementById("editModal").style.display = "none";

    });


// Close modal when clicking outside

document.getElementById("editModal")
    .addEventListener("click", (event) => {

        if (event.target.id === "editModal") {

            document.getElementById("editModal").style.display = "none";

        }

    });

    // =========================
// LOGOUT
// =========================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    sessionStorage.removeItem("adminLoggedIn");

    window.location.href = "login.html";

});