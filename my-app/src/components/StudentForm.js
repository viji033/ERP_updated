import React, { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm() {
  const STUDENTS_API_URL = "http://localhost:8000/api/student/createStudent";
  const GET_ALL_API_URL = "http://localhost:8000/api/student/all";

  const [studentForm, setStudentForm] = useState({
    rollno: '',
    name: '',
    dept: '',
    classSection: '',
    dob: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    setFetching(true);
    try {
      const res = await fetch(GET_ALL_API_URL);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
      } else {
        alert("❌ Failed to fetch students.");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching students.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = async () => {
    if (!studentForm.rollno || !studentForm.name || !studentForm.dept || !studentForm.email || !studentForm.classSection) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(STUDENTS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentForm),
      });

      if (!res.ok) throw new Error("Failed to add student");

      await res.json();
      setStudentForm({ rollno: '', name: '', dept: '', classSection: '', dob: '', email: '' });
      alert("✅ Student added successfully!");
      fetchAllStudents();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section student-section">
      
      <div className="student-form">
        <input type="text" name="rollno" value={studentForm.rollno} onChange={handleChange} placeholder="Roll No" />
        <input type="text" name="name" value={studentForm.name} onChange={handleChange} placeholder="Full Name" />
        <input type="text" name="dept" value={studentForm.dept} onChange={handleChange} placeholder="Department" />
        <input type="text" name="classSection" value={studentForm.classSection} onChange={handleChange} placeholder="Class Section" />
        <input type="date" name="dob" value={studentForm.dob} onChange={handleChange} />
        <input type="email" name="email" value={studentForm.email} onChange={handleChange} placeholder="Email" />

        {/* Centered Button */}
        <button className="add-btn" onClick={addStudent} disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </div>

      <div className="student-list">
        <h3>All Students</h3>
        {fetching ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Class</th>
                  <th>DOB</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.rollno}</td>
                    <td>{student.name}</td>
                    <td>{student.dept}</td>
                    <td>{student.classSection}</td>
                    <td>{student.dob ? new Date(student.dob).toLocaleDateString() : ''}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentForm;
