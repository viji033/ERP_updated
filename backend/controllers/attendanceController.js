const Attendance = require('../models/Attendance');
const Student = require('../models/Students');

// Helper to update or insert a monthly summary
const updateMonthlySummary = (attendance, month, year) => {
  let total = 0, present = 0;

  attendance.attendanceRecords.forEach(record => {
    const d = new Date(record.date);
    if (d.getMonth() + 1 === month && d.getFullYear() === year) {
      total += record.periods.length;
      present += record.periods.filter(p => p).length;
    }
  });

  const percentage = total > 0 ? (present / total) * 100 : 0;

  const summaryIndex = attendance.monthlySummaries.findIndex(
    s => s.month === month && s.year === year
  );

  const summary = { month, year, total, present, percentage: Number(percentage.toFixed(2)) };

  if (summaryIndex >= 0) {
    attendance.monthlySummaries[summaryIndex] = summary;
  } else {
    attendance.monthlySummaries.push(summary);
  }
};

// Update Attendance (Add or Update attendance records)
exports.updateAttendance = async (req, res) => {
  const { email, periodUpdates } = req.body;

  if (!email || !Array.isArray(periodUpdates) || periodUpdates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input: periodUpdates must be an array with at least one object'
    });
  }

  for (const update of periodUpdates) {
    if (![1, 2, 3, 4, 5, 6, 7, 8].includes(update.period)) {
      return res.status(400).json({ success: false, message: 'Invalid period number' });
    }
    if (!['Present', 'Absent'].includes(update.status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
  }

  try {
    const sanitizedEmail = email.toLowerCase().trim();
    const student = await Student.findOne({ email: sanitizedEmail });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const today = new Date();
    const formattedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    let attendance = await Attendance.findOne({ studentId: student._id });

    if (!attendance) {
      attendance = new Attendance({
        studentId: student._id,
        rollNo: student.rollno,
        name: student.name,
        email: student.email,
        dept: student.dept,
        classSection: student.classSection,
        attendanceRecords: []
      });
    }

    let record = attendance.attendanceRecords.find(
      r => r.date.toISOString().split('T')[0] === formattedDate.toISOString().split('T')[0]
    );

    if (!record) {
      const periods = new Array(8).fill(false); // assuming 8 periods per day
      record = { date: formattedDate, periods };
      attendance.attendanceRecords.push(record);
    }

    // Update attendance for each period
    periodUpdates.forEach(update => {
      const index = update.period - 1; // index is 0-based, while period is 1-based
      record.periods[index] = update.status === 'Present';
    });

    // Recalculate total and present periods
    attendance.totalPeriods = attendance.attendanceRecords.reduce(
      (acc, r) => acc + r.periods.length, 0
    );
    attendance.presentPeriods = attendance.attendanceRecords.reduce(
      (acc, r) => acc + r.periods.filter(p => p).length, 0
    );

    // Update or insert monthly summary
    updateMonthlySummary(attendance, month, year);

    await attendance.save();

    res.status(200).json({
      success: true,
      message: 'Attendance updated successfully',
      data: {
        totalPeriods: attendance.totalPeriods,
        presentPeriods: attendance.presentPeriods
      }
    });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get Monthly Attendance Percentage
exports.getMonthlyAttendancePercentage = async (req, res) => {
  const { email, month, year } = req.query;

  if (!email || !month || !year) {
    return res.status(400).json({
      success: false,
      message: 'Email, month, and year are required',
    });
  }

  try {
    const sanitizedEmail = email.toLowerCase().trim();
    const student = await Student.findOne({ email: sanitizedEmail });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const attendance = await Attendance.findOne({ studentId: student._id });
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'No attendance records found' });
    }

    const targetMonth = parseInt(month);
    const targetYear = parseInt(year);

    const summary = attendance.monthlySummaries.find(
      s => s.month === targetMonth && s.year === targetYear
    );

    if (!summary) {
      return res.status(404).json({ success: false, message: 'No attendance summary found for given month/year' });
    }

    res.status(200).json({
      success: true,
      email: sanitizedEmail,
      month: targetMonth,
      year: targetYear,
      totalPeriods: summary.total,
      presentPeriods: summary.present,
      attendancePercentage: `${summary.percentage.toFixed(2)}%`
    });
  } catch (error) {
    console.error('Error fetching monthly attendance:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Add this function to your attendanceController.js file

// Get Student Details with Attendance Percentage
exports.getStudentDetailsWithAttendance = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  try {
    const sanitizedEmail = email.toLowerCase().trim();
    const student = await Student.findOne({ email: sanitizedEmail });

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    const attendance = await Attendance.findOne({ studentId: student._id });
    
    // Create student details object
    const studentDetails = {
      studentId: student._id,
      name: student.name,
      email: student.email,
      rollNo: student.rollno,
      dept: student.dept,
      classSection: student.classSection,
      attendance: {
        totalPeriods: 0,
        presentPeriods: 0,
        overallPercentage: 0,
        monthlySummaries: []
      }
    };

    // Add attendance data if available
    if (attendance) {
      studentDetails.attendance.totalPeriods = attendance.totalPeriods;
      studentDetails.attendance.presentPeriods = attendance.presentPeriods;
      
      // Calculate overall percentage
      studentDetails.attendance.overallPercentage = 
        attendance.totalPeriods > 0 
          ? Number(((attendance.presentPeriods / attendance.totalPeriods) * 100).toFixed(2)) 
          : 0;
      
      // Add monthly summaries
      studentDetails.attendance.monthlySummaries = attendance.monthlySummaries.sort((a, b) => {
        // Sort by year first, then by month
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student details retrieved successfully',
      data: studentDetails
    });
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

