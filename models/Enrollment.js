var mongoose = require('mongoose')
var passport = require('passport')
require('../config/passport')(passport)

  var EnrollmentSchema = new mongoose.Schema({
    graduateType: String,
    campus: String,
    shift: String,
    course: String,
    studentName: String,
    studentMail: String,
    studentCPF: String,
    employeer: String,
    enrollmentDateTime: {type: Date, default: Date.now}
    
}, { 
    collection: 'enrollment',
    versionKey: false
 })

 module.exports = mongoose.model('Enrollment', EnrollmentSchema)