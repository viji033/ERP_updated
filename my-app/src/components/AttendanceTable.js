import React, { useState, useEffect } from "react";
import './AttendanceTable.css'; // Ensure this file styles your UI

const AttendanceInput = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [percentages, setPercentages] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  });
  const [loadingPercentage, setLoadingPercentage] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/api/student/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudents(data.data);
          const initialLoadingState = {};
          data.data.forEach(student => {
            initialLoadingState[student.email] = false;
          });
          setLoadingPercentage(initialLoadingState);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (email, period, status) => {
    setAttendance((prev) => ({
      ...prev,
      [email]: {
        ...prev[email],
        [period]: status,
      },
    }));
  };

  const handleSubmit = async (email) => {
    try {
      const periodUpdates = Object.entries(attendance[email] || {}).map(
        ([period, status]) => ({
          period: parseInt(period),
          status,
        })
      );

      if (periodUpdates.length === 0) {
        alert("No attendance changes to submit");
        return;
      }

      const res = await fetch("http://localhost:8000/api/attendance/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, periodUpdates, date: selectedDate }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.success) {
        alert(`Attendance updated for ${email}`);
        fetchAttendancePercentage(email);
      } else {
        alert(`Failed to update attendance for ${email}: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert(`Error submitting attendance: ${error.message}`);
    }
  };

  const fetchAttendancePercentage = async (email) => {
    try {
      setLoadingPercentage(prev => ({ ...prev, [email]: true }));

      const url = `http://localhost:8000/api/attendance/percentage?email=${encodeURIComponent(email)}&month=${selectedMonth}&year=${selectedYear}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        setPercentages(prev => ({
          ...prev,
          [email]: {
            percentage: data.attendancePercentage,
            totalPeriods: data.totalPeriods,
            presentPeriods: data.presentPeriods
          }
        }));
      } else {
        console.error("Failed to fetch percentage:", data.message);
        setPercentages(prev => ({
          ...prev,
          [email]: { percentage: "N/A", totalPeriods: 0, presentPeriods: 0 }
        }));
      }
    } catch (error) {
      console.error("Error fetching percentage:", error);
      setPercentages(prev => ({
        ...prev,
        [email]: { percentage: "0", totalPeriods: 0, presentPeriods: 0 }
      }));
    } finally {
      setLoadingPercentage(prev => ({ ...prev, [email]: false }));
    }
  };

  const fetchAllPercentages = () => {
    students.forEach(student => {
      fetchAttendancePercentage(student.email);
    });
  };

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="attendance-container">
      

      <div className="attendance-filters">
        <div className="filter-group">
          <label>Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button className="fetch-all-btn" onClick={fetchAllPercentages}>
          Get All Percentages
        </button>
      </div>

      <p>Selected Date: {selectedDate}</p>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              {[...Array(8)].map((_, i) => (
                <th key={i}>P{i + 1}</th>
              ))}
              <th>Action</th>
              <th>Attendance %</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.rollno}</td>
                <td>{student.name}</td>
                {[...Array(8)].map((_, i) => (
                  <td key={i}>
                    <select
                      value={attendance[student.email]?.[i + 1] || "Absent"}
                      onChange={(e) =>
                        handleChange(student.email, i + 1, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                ))}
                <td>
                  <button
                    className="submit-btn"
                    onClick={() => handleSubmit(student.email)}
                  >
                    Submit
                  </button>
                </td>
                <td>
                  {loadingPercentage[student.email] ? (
                    <span>Loading...</span>
                  ) : percentages[student.email] ? (
                    <span
                      className={
                        parseFloat(percentages[student.email].percentage) < 75
                          ? "percentage-low"
                          : "percentage-good"
                      }
                    >
                      {percentages[student.email].percentage}
                    </span>
                  ) : (
                    <button
                      className="fetch-btn"
                      onClick={() => fetchAttendancePercentage(student.email)}
                    >
                      Get %
                    </button>
                  )}
                </td>
                <td>
                  {percentages[student.email] && (
                    <span className="attendance-details">
                      {percentages[student.email].presentPeriods}/
                      {percentages[student.email].totalPeriods} periods
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceInput;
