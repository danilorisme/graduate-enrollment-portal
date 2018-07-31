var mongoose = require('mongoose')

var CourseSchema = new mongoose.Schema({
    name: String
}, { collection: 'course',
    versionKey: false
})

 module.exports = mongoose.model('Course', CourseSchema)