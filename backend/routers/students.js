const express = require('express');
const StudentController = require('../controllers/StudentController');
const router = express.Router();


router.post('/createStudent',StudentController.createStudent);
router.get('/profile',StudentController.profile);
router.get('/all', StudentController.getAllStudents); 

module.exports = router;