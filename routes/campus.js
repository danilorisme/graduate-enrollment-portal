var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Campus = require('../models/Campus.js')
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
    Campus.find(function (err, docs) {
      if (err) return next(err)
      res.json(docs)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Get one
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Campus.findById(req.params.id, function (err, doc) {
      if (err) return next(err)
      res.json(doc)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Create
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Campus.create(req.body, function (err, doc) {
      if (err) return next(err)
      res.json(doc)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Update
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Campus.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
      if (err) return next(err)
      res.json(doc)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

// Delete
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Campus.findByIdAndRemove(req.params.id, req.body, function (err, doc) {
      if (err) return next(err)
      res.json(doc)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

module.exports = router