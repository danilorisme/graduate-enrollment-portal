var mongoose = require('mongoose')

var VacancySchema = new mongoose.Schema({
    campus: String,
    shift: String,
    course: String,
    numVacancies: Number,
    numVacanciesFilled: Number
}, { collection: 'vacancies',
    versionKey: false
});

 module.exports = mongoose.model('Vacancy', VacancySchema)