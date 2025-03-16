import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/students.js";
import courseRoutes from "./routes/courses.js"; 
import attendanceRoutes from "./routes/attendance.js";
import gradeRoutes from "./routes/grades.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes); 
app.use("/api/attendance", attendanceRoutes);
app.use("/api/grades", gradeRoutes);


app.get("/", (req, res) => {
  res.send("Student Management System API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
