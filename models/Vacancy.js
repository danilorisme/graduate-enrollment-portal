var mongoose = require('mongoose')

var VacancySchema = new mongoose.Schema({
    campus: String,
    shift: String,
    course: String,
    numVacancies: Number,
    numVacanciesFilled: {type: Number, default: 0}
}, { collection: 'vacancy',
    versionKey: false
})

 module.exports = mongoose.model('Vacancy', VacancySchema)