import express from "express";
import db from "../db.js"; // Ensure this path is correct

const router = express.Router();

// ✅ GET all students
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

// ✅ POST route to add a student
router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      res.status(500).json({ error: "Failed to add student" });
    } else {
      res.json({ message: "Student added successfully", id: result.insertId });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?";

  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) {
      console.error("Update error:", err.sqlMessage || err);
      return res
        .status(500)
        .json({
          error: "Failed to update student",
          details: err.sqlMessage || err,
        });
    }
    res.status(200).json({ message: "Student updated successfully" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err.sqlMessage || err);
      return res
        .status(500)
        .json({
          error: "Failed to delete student",
          details: err.sqlMessage || err,
        });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  });
});

export default router;
