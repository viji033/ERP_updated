const mongoose = require('mongoose');

const AttendanceRecordSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true, 
    default: () => new Date()
  },
  periods: {
    type: [Boolean],
    required: true,
    validate: [arr => arr.length === 8, 'Must have exactly 8 periods']
  }
});

const MonthlySummarySchema = new mongoose.Schema({
  month: Number,   // 1–12
  year: Number,
  total: Number,
  present: Number,
  percentage: Number
}, { _id: false });

const AttendanceSchema = new mongoose.Schema(
  {
    studentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Student', 
      required: true
    },
    rollNo: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    dept: { type: String, required: true, trim: true },
    classSection: { type: String, required: true, trim: true },
    attendanceRecords: [AttendanceRecordSchema],
    totalPeriods: { type: Number, default: 0 },
    presentPeriods: { type: Number, default: 0 },
    monthlySummaries: [MonthlySummarySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', AttendanceSchema);
