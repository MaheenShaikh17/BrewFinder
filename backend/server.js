require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to BrewFinder API!"
    });
});


// Get all places from MySQL
app.get("/api/places", (req, res) => {

    const sql = "SELECT * FROM places";

    db.query(sql, (err, results) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});


// Get one place by ID
app.get("/api/places/:id", (req, res) => {

    const placeId = Number(req.params.id);

    const sql = "SELECT * FROM places WHERE id = ?";

    db.query(sql, [placeId], (err, results) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        res.json(results[0]);
    });
});





// Add a new place
app.post("/api/places", (req, res) => {

    const {
        name,
        type,
        category,
        location,
        city,
        rating,
        reviews,
        image
    } = req.body;

    const sql = `
        INSERT INTO places
        (name, type, category, location, city, rating, reviews, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        type,
        category,
        location,
        city,
        rating,
        reviews,
        image
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to add place"
            });
        }

        res.status(201).json({
            message: "Place added successfully",
            placeId: result.insertId
        });
    });
});


// Delete a place
app.delete("/api/places/:id", (req, res) => {
    const placeId = Number(req.params.id);

    const sql = "DELETE FROM places WHERE id = ?";

    db.query(sql, [placeId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                message: "Failed to delete place"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        res.json({
            message: "Place deleted successfully"
        });
    });
});

// Update a place
app.put("/api/places/:id", (req, res) => {
    const placeId = Number(req.params.id);

    const {
        name,
        type,
        category,
        location,
        city,
        rating,
        reviews,
        image
    } = req.body;

    const sql = `
        UPDATE places
        SET
            name = ?,
            type = ?,
            category = ?,
            location = ?,
            city = ?,
            rating = ?,
            reviews = ?,
            image = ?
        WHERE id = ?
    `;

    const values = [
        name,
        type,
        category,
        location,
        city,
        rating,
        reviews,
        image,
        placeId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                message: "Failed to update place"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        res.json({
            message: "Place updated successfully"
        });
    });
});


// Admin Login
app.post("/api/admin/login", (req, res) => {

    const { username, password } = req.body;

    // Temporary admin credentials
    // We will move these to environment variables later.
   const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
});

app.listen(PORT, () => {
    console.log(
        `BrewFinder server is running at http://localhost:${PORT}`
    );
});

