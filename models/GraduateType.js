var mongoose = require('mongoose')

  var GraduateTypeSchema = new mongoose.Schema({
    name: String
}, { collection: 'graduatetype',
    versionKey: false
})

 module.exports = mongoose.model('GraduateType', GraduateTypeSchema)