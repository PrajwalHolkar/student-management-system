import { useState, useEffect } from "react";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    // Fetch courses when component loads
    useEffect(() => {
        fetchCourses();
    }, []);

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
            await axios.post("http://localhost:5000/api/courses", formData);
            alert("Course added successfully!");
            fetchCourses(); // Refresh course list
        } catch (error) {
            alert("Failed to add course");
            console.error("Error adding course:", error);
        }
    };

    return (
        <div>
            <h2>Courses</h2>
            <form onSubmit={handleSubmit}>
                <label>Course Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />

                <button type="submit">Add Course</button>
            </form>

            <h3>Course List</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
