var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Enrollment = require('../models/Enrollment.js')
var Vacancy = require('../models/Vacancy.js')
var passport = require('passport')
require('../config/passport')(passport)

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

checkVacancy = function(enrollment) {
  var vacancies
  var enrollment = enrollment
  var validation
  // console.log(typeof enrollment + "inscricoes" +  enrollment.course)

  // vacancies = Vacancy.find({}).exec(function(err, docs){
  //   // check(docs)
  //   getValidation(check(docs))
  //   // console.log("CheckReturn " +check(docs))
  // })

  function fetchTheData(validation){
    return new Promise(function(resolve){
      Vacancy.find({}).exec(function(err, docs){
        resolve(check(docs))
      })
    })
    console.log("fetchTheData "+validation)
  }

  async function getSomeData(value){
    const result = await fetchTheData(value);
    return result;
  }

  getSomeData(validation)
  .then(function(result){
    return result
  })

  function check(vacancies){
    for(var key in Object.keys(vacancies)){
      if (enrollment.course == vacancies[key].course && enrollment.shift == vacancies[key].shift && enrollment.campus == vacancies[key].campus) {
        if (vacancies[key].numVacanciesFilled == vacancies[key].numVacancies) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  }

  console.log("validation "+validation)

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
  console.log("check "+checkVacancy(req.body))
  if (token) {
    Enrollment.create(req.body, function (err, doc) {
      if (err) return next(err)
      res.json(doc)
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