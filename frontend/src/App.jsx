import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/grades">Grades</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
