import React, { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", age: "" });
  const [editingStudent, setEditingStudent] = useState(null); // Track student being edited

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add new student
  const addStudent = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) throw new Error("Failed to add student");

      setNewStudent({ name: "", email: "", age: "" });
      fetchStudents(); // Refresh student list
    } catch (error) {
      alert("Failed to add student");
    }
  };

  // Handle delete student
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete student");

      fetchStudents(); // Refresh list
    } catch (error) {
      alert("Failed to delete student");
    }
  };

  // Handle edit student
  const editStudent = (student) => {
    setEditingStudent(student);
  };

  // Handle update student
  const updateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${editingStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStudent),
      });

      if (!response.ok) throw new Error("Failed to update student");

      setEditingStudent(null); // Clear edit mode
      fetchStudents();
    } catch (error) {
      alert("Failed to update student");
    }
  };

  return (
    <div>
      <h2>Student Management</h2>

      {/* Form for adding student */}
      <div>
        <input type="text" name="name" placeholder="Name" value={newStudent.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={newStudent.email} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" value={newStudent.age} onChange={handleChange} />
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* Edit Student Form */}
      {editingStudent && (
        <div>
          <h3>Edit Student</h3>
          <input type="text" name="name" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} />
          <input type="email" name="email" value={editingStudent.email} onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })} />
          <input type="number" name="age" value={editingStudent.age} onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })} />
          <button onClick={updateStudent}>Update Student</button>
          <button onClick={() => setEditingStudent(null)}>Cancel</button>
        </div>
      )}

      {/* Display Students */}
      <ul>
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((student) => (
            <li key={student.id}>
              {student.name} ({student.email}, Age: {student.age})
              <button onClick={() => editStudent(student)}>Edit</button>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Students;
