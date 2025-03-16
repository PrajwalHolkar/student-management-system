import express from "express";
import db from "../db.js";

const router = express.Router();

// Fetch all grades
router.get("/", (req, res) => {
    db.query("SELECT * FROM grades", (err, results) => {
        if (err) {
            console.error("Error fetching grades:", err);
            res.status(500).json({ error: "Failed to fetch grades" });
        } else {
            res.json(results);
        }
    });
});

// Add a new grade
router.post("/", (req, res) => {
    const { student_id, course_id, grade } = req.body;

    if (!student_id || !course_id || !grade) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.query(
        "INSERT INTO grades (student_id, course_id, grade) VALUES (?, ?, ?)",
        [student_id, course_id, grade],
        (err, result) => {
            if (err) {
                console.error("Error adding grade:", err);
                res.status(500).json({ error: "Failed to add grade" });
            } else {
                res.json({ message: "Grade added successfully" });
            }
        }
    );
});

export default router;
