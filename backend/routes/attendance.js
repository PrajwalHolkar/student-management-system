import express from "express";
import db from "../db.js"; // Import database connection

const router = express.Router();

// ✅ GET all attendance records
router.get("/", (req, res) => {
  db.query("SELECT * FROM attendance", (err, results) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ POST: Add an attendance record
router.post("/", (req, res) => {
  const { student_id, date, status } = req.body;

  if (!student_id || !date || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";
  db.query(query, [student_id, date, status], (err, result) => {
    if (err) {
      console.error("Error adding attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Attendance recorded successfully" });
  });
});

export default router;
