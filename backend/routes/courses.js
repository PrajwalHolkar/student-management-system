import express from "express";
import db from "../db.js";

const router = express.Router();

//Get all courses
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});


// Add a new course
router.post("/", (req, res) => {
  const { name, description } = req.body;
  db.query("INSERT INTO courses (name, description) VALUES (?, ?)", [name, description], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add course" });
    res.json({ message: "Course added successfully" });
  });
});

// Update a course
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query("UPDATE courses SET name=?, description=? WHERE id=?", [name, description, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to update course" });
    res.json({ message: "Course updated successfully" });
  });
});

// Delete a course
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM courses WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete course" });
    res.json({ message: "Course deleted successfully" });
  });
});

export default router;
