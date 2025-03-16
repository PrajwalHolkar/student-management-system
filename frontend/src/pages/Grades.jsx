import { useState, useEffect } from "react";
import axios from "axios";

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        course_id: "",
        grade: "",
    });

    // Fetch grades, students, and courses when component loads
    useEffect(() => {
        fetchGrades();
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/grades");
            setGrades(response.data);
        } catch (error) {
            console.error("Error fetching grades:", error);
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

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/courses");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
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
            await axios.post("http://localhost:5000/api/grades", formData);
            alert("Grade added successfully!");
            fetchGrades(); // Refresh grades list
        } catch (error) {
            alert("Failed to add grade");
            console.error("Error adding grade:", error);
        }
    };

    return (
        <div>
            <h2>Grades</h2>
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

                <label>Course:</label>
                <select name="course_id" value={formData.course_id} onChange={handleChange}>
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.id}
                        </option>
                    ))}
                </select>

                <label>Grade:</label>
                <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />

                <button type="submit">Add Grade</button>
            </form>

            <h3>All Grades</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student ID</th>
                        <th>Course ID</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade) => (
                        <tr key={grade.id}>
                            <td>{grade.id}</td>
                            <td>{grade.student_id}</td>
                            <td>{grade.course_id}</td>
                            <td>{grade.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grades;
