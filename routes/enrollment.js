var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Enrollment = require('../models/Enrollment.js')
var Vacancy = require('../models/Vacancy.js')
var passport = require('passport')
require('../config/passport')(passport)
const SparkPost = require('sparkpost');
const client = new SparkPost('2f07ededdaa8a46c7be29735abb01fac482619d4');

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

sendMail = function(enrollment) {
  var enrollment = enrollment
  client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Confirmação de Inscrição',
      html:'<html><body><p>Olá ' + enrollment.studentName + '. </br></br>Você foi matriculado no curso ' + enrollment.course + ' na unidade ' + enrollment.campus + ' e turno ' + enrollment.shift + '. </br></br>Boa sorte nesta nova etapa da sua vida, estaremos aqui para quaiquer dúvidas ou sugestões. </br></br>Att, </br>Central de matrículas Estácio</p></body></html>'
    },
    recipients: [
      {address: enrollment.studentMail}
    ]
  })
  .then(data => {
    console.log('Sent mailing!')
  })
  .catch(err => {
    console.log(err)
  })
}

// Get all
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Enrollment.find(function (err, docs) {
      if (err) return next(err)
      res.json(docs)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Get one
router.get('/:id', function(req, res, next) {
  Enrollment.findById(req.params.id, function (err, doc) {
    if (err) return next(err)
    res.json(doc)
  })
})

// Create
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  req.body.employee = req.user.username

  if (token) {
    Vacancy.find({}).exec(function(err, docs){
      var vacancies = docs
      var enrollment = req.body
      for(var key in Object.keys(vacancies)){
        if (enrollment.course == vacancies[key].course && enrollment.shift == vacancies[key].shift && enrollment.campus == vacancies[key].campus) {
          if (vacancies[key].numVacanciesFilled == vacancies[key].numVacancies) {
            res.json({success: false})
            return false
          } else {
            Enrollment.create(req.body, function (err, doc) {
              if (err) return next(err)
              // sendMail(doc)
              console.log("vacancies[key]._id "+ vacancies[key]._id)
              console.log("vacancies[key]._id "+ typeof vacancies[key].numVacanciesFilled + " " + typeof +vacancies[key].numVacanciesFilled)
              console.log("numVacanciesFilled "+ +vacancies[key].numVacanciesFilled + 1)
              // Vacancy.findByIdAndUpdate(vacancies[key]._id, { numVacanciesFilled: vacancies[key].numVacanciesFilled+1 }, function (err) {
              //   if (err) return next(err)
              // })
              res.json(doc)
            })
            return true
          }
        } else {
          res.json({success: false})
          return false
        }
      }
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Update
router.put('/:id', function(req, res, next) {
  Enrollment.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
    if (err) return next(err)
    res.json(doc)
  })
})

// Delete
router.delete('/:id', function(req, res, next) {
  Enrollment.findByIdAndRemove(req.params.id, req.body, function (err, doc) {
    if (err) return next(err)
    res.json(doc)
  })
})

module.exports = router