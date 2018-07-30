var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Shift = require('../models/Shift.js')
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

// Get all
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Shift.find(function (err, docs) {
      if (err) return next(err)
      res.json(docs)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Get one
router.get('/:id', function(req, res, next) {
  Shift.findById(req.params.id, function (err, doc) {
    if (err) return next(err)
    res.json(doc)
  })
})

// Create
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Shift.create(req.body, function (err, doc) {
      if (err) return next(err)
      res.json(doc)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Update
router.put('/:id', function(req, res, next) {
  Shift.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
    if (err) return next(err)
    res.json(doc)
  })
})

// Delete
router.delete('/:id', function(req, res, next) {
  Shift.findByIdAndRemove(req.params.id, req.body, function (err, doc) {
    if (err) return next(err)
    res.json(doc)
  })
})

module.exports = router