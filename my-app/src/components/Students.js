import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Students.css";

const StudentList = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const studentEmail = localStorage.getItem("userEmail");
    const savedProfilePhoto = localStorage.getItem(`studentPhoto_${studentEmail}`);

    if (!studentEmail) {
      navigate("/student-auth", { replace: true });
      return;
    }

    if (savedProfilePhoto) {
      setProfilePhoto(savedProfilePhoto);
    }

    fetchStudent(studentEmail);
  }, [navigate]);

  const fetchStudent = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/api/attendance/student-details?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error("Failed to fetch student data.");
      const result = await response.json();
      const studentData = result.data;

      setStudent({
        ...studentData,
        attendancePercentage: studentData.attendance?.overallPercentage ?? 0
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePhoto(base64Image);
        const studentEmail = localStorage.getItem("userEmail");
        localStorage.setItem(`studentPhoto_${studentEmail}`, base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const markAttendance = async () => {
    if (!student) return;
    if (!window.confirm("Are you sure you want to mark attendance?")) return;

    setMarking(true);
    try {
      const response = await fetch(`http://localhost:8000/api/attendance/mark/${student._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          isPresent: true,
          day: new Date().toLocaleString("en-US", { weekday: "short" }).toLowerCase(),
        }),
      });

      if (!response.ok) throw new Error("Failed to mark attendance");

      alert("Attendance marked successfully!");
      fetchStudent(student.email);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setMarking(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/student-auth", { replace: true });
  };

  if (loading) return <div className="loading-indicator">Loading student details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!student) return <div className="error-message">No student data available.</div>;

  return (
    <>
      <div className="student-container">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>

        <div className="student-content">
          <div className="student-profile">
            <div className="profile-card">
              <div className="profile-img-container">
                <img
                  src={profilePhoto || "https://via.placeholder.com/250"}
                  alt="Student"
                  className="profile-img"
                />
                <button className="edit-photo-btn" onClick={triggerFileInput}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <h3 className="student-name">{student.name}</h3>
              <p className="student-dept">{student.dept}</p>
            </div>
          </div>

          <div className="student-details">
            <h2 className="student-title">Student Details</h2>
            <table className="student-table">
              <tbody>
                <tr><td>Roll No:</td><td>{student.rollNo}</td></tr>
                <tr><td>Department:</td><td>{student.dept}</td></tr>
                <tr><td>Class Section:</td><td>{student.classSection}</td></tr>
                <tr><td>Date of Birth:</td><td>{student.dob || "N/A"}</td></tr>
                <tr><td>Email:</td><td>{student.email}</td></tr>
                <tr>
                  <td>Attendance Percentage:</td>
                  <td style={{
                    color: student.attendancePercentage < 75 ? "red" : "green",
                    fontWeight: "bold"
                  }}>
                    {student.attendancePercentage}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentList;
