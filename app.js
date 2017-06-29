const express = require('express')
const session = require('express-session')
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const parseurl = require('parseurl')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.listen(3000, function () {
  console.log('Started hangman application')
})

const routes = require('./routes/index')
app.use('/', routes)
