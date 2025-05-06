import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Staff.css';
import StudentForm from './StudentForm';
import AttendanceTable from './AttendanceTable';
import StaffProfile from '../components/stafprofile/StaffProfile';
import Footer from './Footer';

function Staff() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleSubmitAttendance = async (student) => {
    setLoading(true);
    try {
      // Assume there's an API endpoint to submit attendance
      const response = await fetch('http://localhost:8000/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student._id,
          attendance: student.attendance,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Attendance submission failed');
      }

      alert('Attendance submitted successfully');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Failed to submit attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear any session data or tokens
    localStorage.clear();
    // Redirect to StaffAuth page
    navigate('/staff-auth');
  };

  return (
    <div className="staff-container">
      {/* Simple Logout Button (matching StudentList style) */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {/* Staff Profile Component */}
      <StaffProfile />

      {/* Student Form Component to add new students */}
      <section className="section">
        <h2>Add New Student</h2>
        <StudentForm onAddStudent={handleAddStudent} />
      </section>

      {/* Attendance Table Component to display and manage attendance */}
      <section className="section">
        <h2>Attendance Management</h2>
        <AttendanceTable
          students={students}
          setStudents={setStudents}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          submitAttendance={handleSubmitAttendance}
          loading={loading}
        />
      </section>

      <Footer />
    </div>
  );
}

export default Staff;