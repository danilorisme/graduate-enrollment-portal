var mongoose = require('mongoose')

  var EnrollmentSchema = new mongoose.Schema({
    graduateType: String,
    campus: String,
    shift: String,
    course: String,
    studentName: String,
    studentMail: String,
    studentCPF: String,
    enrollmentDateTime: {type: Date, default: Date.now}
}, { 
    collection: 'enrollment',
    versionKey: false
 })

 module.exports = mongoose.model('Enrollment', EnrollmentSchema)