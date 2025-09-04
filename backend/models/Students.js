const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollno: {type:String, },
    name: {type:String, },
    dept: {type:String, },
    classSection:{type:String,},
    dob: {type:Date, },
    email: {type:String, unique:true,},
    password: {type:String,},
});



module.exports = mongoose.model('Student', studentSchema);