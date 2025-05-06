const students = require('../models/Students');

// Create Student
exports.createStudent = async (req, res) => {
    const { rollno, name, dept, classSection, dob, email } = req.body;

    try {
        const existingUser = await students.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User already exists!',
            });
        }

        const emailPrefix = email.split('@')[0];
        const password = emailPrefix + '1234';  

        const newStudent = new students({
            rollno,
            name,
            dept,
            classSection,
            dob,
            email,
            password,
        });

        await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student added successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Student Profile using email (via query param)
exports.profile = async (req, res) => {
    const email = req.query.email; // changed from req.body.email

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required in query parameters",
        });
    }

    try {
        const student = await students.findOne({ email });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                rollno: student.rollno,
                name: student.name,
                dept: student.dept,
                classSection: student.classSection,
                dob: student.dob,
                email: student.email,
            },
        });
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// Get All Students
exports.getAllStudents = async (req, res) => {
    try {
        const allStudents = await students.find();

        return res.status(200).json({
            success: true,
            data: allStudents,
        });

    } catch (error) {
        console.error('Error fetching all students:', error.message);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
