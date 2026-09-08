let places = [];
const API_URL = "http://localhost:5000/api/places";




// =============================
// HTML ELEMENTS
// =============================

const placeContainer = document.getElementById("placeContainer");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

const areaFilter = document.getElementById("areaFilter");

const sortFilter = document.getElementById("sortFilter");


const placeModal = document.getElementById("placeModal");

const closeModal = document.getElementById("closeModal");

const modalDetails = document.getElementById("modalDetails");



// =============================
// FETCH PLACES FROM BACKEND API
// =============================

async function fetchPlaces() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Failed to fetch places");

        }


        places = await response.json();

        updatePlaces();

        console.log("Places loaded successfully!");

    }

    catch (error) {

        console.error(
            "Error fetching places:",
            error
        );


        placeContainer.innerHTML = `
            <div class="no-results">
                <h3>Unable to load places 😕</h3>

                <p>
                    Please make sure the backend server is running.
                </p>
            </div>
        `;

    }

}

// =============================
// CURRENT FILTER VALUES
// =============================

let currentType = "all";

let currentSearch = "";

let currentArea = "all";

let currentSort = "default";


// =============================
// DISPLAY PLACES
// =============================

function displayPlaces(placeList) {

    placeContainer.innerHTML = "";


    if (placeList.length === 0) {

        placeContainer.innerHTML = `
            <div class="no-results">
                <h3>No places found 😕</h3>
                <p>
                    Try changing your search or filters.
                </p>
            </div>
        `;

        return;
    }


    placeList.forEach(place => {

        const placeCard = document.createElement("div");

        placeCard.classList.add("place-card");


        placeCard.innerHTML = `
            <div class="place-image">

                <img
                    src="${place.image}"
                    alt="${place.name}"
                >

                <span class="rating">
                    ⭐ ${place.rating}
                </span>

            </div>


            <div class="place-info">

                <p class="place-type">
                    ${place.type}
                </p>


                <p class="place-category">
                    ${place.category}
                </p>


                <h3>
                    ${place.name}
                </h3>


                <p class="place-location">
                    📍 ${place.location}
                </p>


                <p class="review-count">
                    ${place.reviews.toLocaleString()} reviews
                </p>


                <button
                    class="view-details-btn"
                    data-id="${place.id}"
                >
                    View Details →
                </button>

            </div>
        `;


        placeContainer.appendChild(placeCard);

    });

}


// =============================
// APPLY ALL FILTERS
// =============================

function updatePlaces() {

    let filteredPlaces = [...places];


    // SEARCH FILTER

    if (currentSearch !== "") {

        filteredPlaces = filteredPlaces.filter(place => {

            return (
                place.name
                    .toLowerCase()
                    .includes(currentSearch)

                ||

                place.type
                    .toLowerCase()
                    .includes(currentSearch)

                ||

                place.category
                    .toLowerCase()
                    .includes(currentSearch)

                ||

                place.location
                    .toLowerCase()
                    .includes(currentSearch)

                ||

                place.city
                    .toLowerCase()
                    .includes(currentSearch)
            );

        });

    }


    // TYPE FILTER

    if (currentType !== "all") {

        if (currentType === "Coffee Shop") {

            filteredPlaces = filteredPlaces.filter(place =>
                place.category
                    .toLowerCase()
                    .includes("coffee")
            );

        } else {

            filteredPlaces = filteredPlaces.filter(place =>
                place.type === currentType
            );

        }

    }


    // AREA FILTER

    if (currentArea !== "all") {

        filteredPlaces = filteredPlaces.filter(place =>
            place.location
                .toLowerCase()
                .includes(currentArea.toLowerCase())
        );

    }


    // SORTING

    if (currentSort === "rating-high") {

        filteredPlaces.sort(
            (a, b) => b.rating - a.rating
        );

    }

    else if (currentSort === "rating-low") {

        filteredPlaces.sort(
            (a, b) => a.rating - b.rating
        );

    }

    else if (currentSort === "reviews") {

        filteredPlaces.sort(
            (a, b) => b.reviews - a.reviews
        );

    }


    displayPlaces(filteredPlaces);

}


// =============================
// SEARCH
// =============================

function searchPlaces() {

    currentSearch = searchInput.value
        .toLowerCase()
        .trim();

    updatePlaces();

}


searchBtn.addEventListener(
    "click",
    searchPlaces
);


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchPlaces();

            document
                .getElementById("places")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


// =============================
// TYPE FILTER BUTTONS
// =============================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            // Remove active class
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            // Add active class
            button.classList.add("active");


            // Update filter
            currentType =
                button.dataset.filter;


            updatePlaces();

        }
    );

});


// =============================
// AREA FILTER
// =============================

areaFilter.addEventListener(
    "change",
    function () {

        currentArea =
            areaFilter.value;

        updatePlaces();

    }
);


// =============================
// SORT FILTER
// =============================

sortFilter.addEventListener(
    "change",
    function () {

        currentSort =
            sortFilter.value;

        updatePlaces();

    }
);


// =============================
// POPULAR SEARCH BUTTONS
// =============================

const popularButtons =
    document.querySelectorAll(
        ".popular-searches button"
    );


popularButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            searchInput.value =
                button.textContent;

            searchPlaces();


            document
                .getElementById("places")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


// =============================
// INITIAL DISPLAY
// =============================

fetchPlaces();


console.log("BrewFinder is running successfully!");





// =============================
// VIEW DETAILS MODAL
// =============================

placeContainer.addEventListener("click", function (event) {

    const button = event.target.closest(".view-details-btn");

    if (!button) {
        return;
    }


    const placeId = Number(button.dataset.id);


    const selectedPlace = places.find(place =>
        place.id === placeId
    );


    if (!selectedPlace) {
        return;
    }


    modalDetails.innerHTML = `

        <img
            class="modal-image"
            src="${selectedPlace.image}"
            alt="${selectedPlace.name}"
        >


        <div class="modal-info">

            <span class="modal-type">
                ${selectedPlace.type}
            </span>


            <h2>
                ${selectedPlace.name}
            </h2>


            <p class="modal-category">
                ${selectedPlace.category}
            </p>


            <p class="modal-detail">
                📍 <strong>Location:</strong>
                ${selectedPlace.location},
                ${selectedPlace.city}, Pakistan
            </p>


            <p class="modal-detail">
                🍽️ <strong>Category:</strong>
                ${selectedPlace.category}
            </p>


            <div class="modal-rating">
                ⭐ ${selectedPlace.rating}
                (${selectedPlace.reviews.toLocaleString()} reviews)
            </div>

        </div>
    `;


    placeModal.classList.add("active");

    document.body.style.overflow = "hidden";

});









// =============================
// CLOSE MODAL
// =============================

closeModal.addEventListener("click", function () {

    placeModal.classList.remove("active");

    document.body.style.overflow = "auto";

});


// Close modal when clicking outside the modal box

placeModal.addEventListener("click", function (event) {

    if (event.target === placeModal) {

        placeModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


// Close modal using Escape key

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        placeModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});