var mongoose = require('mongoose')

var CampusSchema = new mongoose.Schema({
    name: String,
    adress: String
}, { collection: 'campus',
    versionKey: false
});

 module.exports = mongoose.model('Campus', CampusSchema)