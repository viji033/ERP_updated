const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to update attendance (single or multiple periods)
router.post('/attendance', attendanceController.updateAttendance);
router.get('/percentage', attendanceController.getMonthlyAttendancePercentage);
router.get('/student-details', attendanceController.getStudentDetailsWithAttendance);

module.exports = router;
