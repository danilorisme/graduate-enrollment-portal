var mongoose = require('mongoose')

var ShiftSchema = new mongoose.Schema({
    name: String
}, { collection: 'shift',
    versionKey: false
})

 module.exports = mongoose.model('Shift', ShiftSchema)