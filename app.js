var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')

// Mongoose connection
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb+srv://danilorisme:Danvp15s@cluster0-y7yfu.gcp.mongodb.net/graduate_enrollment', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err))

var enrollment = require('./routes/enrollment')
var graduateType = require('./routes/graduateType')
var campus = require('./routes/campus')
var course = require('./routes/course')
var shift = require('./routes/shift')
var vacancy = require('./routes/vacancy')
var auth = require('./routes/auth')
var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/enrollments', express.static(path.join(__dirname, 'dist')))
app.use('/enrollment', enrollment)
app.use('/graduatetype', graduateType)
app.use('/campus', campus)
app.use('/course', course)
app.use('/shift', shift)
app.use('/vacancy', vacancy)
app.use('/api/auth', auth)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err)

  if (req.app.get('env') !== 'development') {
      delete err.stack
  }

    res.status(err.statusCode || 500).json(err)
})

module.exports = app