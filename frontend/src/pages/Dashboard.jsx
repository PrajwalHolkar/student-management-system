import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalAttendance, setTotalAttendance] = useState(0);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const studentsRes = await axios.get("http://localhost:5000/api/students");
            const coursesRes = await axios.get("http://localhost:5000/api/courses");
            const attendanceRes = await axios.get("http://localhost:5000/api/attendance");

            setTotalStudents(studentsRes.data.length);
            setTotalCourses(coursesRes.data.length);
            setTotalAttendance(attendanceRes.data.length);
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="stats">
                <div className="stat-card">
                    <h3>Total Students</h3>
                    <p>{totalStudents}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Courses</h3>
                    <p>{totalCourses}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Attendance Records</h3>
                    <p>{totalAttendance}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
