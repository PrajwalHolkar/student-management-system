import { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        date: "",
        status: "Present", // Default status
    });

    // Fetch attendance and students when component loads
    useEffect(() => {
        fetchAttendance();
        fetchStudents();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/attendance");
            setAttendance(response.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/attendance", formData);
            alert("Attendance recorded successfully!");
            fetchAttendance(); // Refresh attendance list
        } catch (error) {
            alert("Failed to record attendance");
            console.error("Error adding attendance:", error);
        }
    };

    return (
        <div>
            <h2>Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label>Student:</label>
                <select name="student_id" value={formData.student_id} onChange={handleChange}>
                    <option value="">Select Student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>

                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>

                <button type="submit">Mark Attendance</button>
            </form>

            <h3>Attendance Records</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student ID</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.id}</td>
                            <td>{entry.student_id}</td>
                            <td>{entry.date}</td>
                            <td>{entry.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;
