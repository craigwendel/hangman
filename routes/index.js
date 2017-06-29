const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const session = require('express-session')
const Words = require('../models/words')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

let word = ''
let usersWord = ''
let usersWordArray = []
let wordArray = []
let guessesLeft = 0
let sess = ''
let lettersGuessedArray = []
let lettersGuessed = ''

router.post('/newgame', function (req, res) {
  word = Words.generateWord()
  wordArray = word.split('')
  usersWordArray = Words.getNewWord(wordArray)
  usersWord = usersWordArray.join('')
  guessesLeft = 8
  res.redirect('/')
})

router.post('/guessletter', function (req, res) {
  sess = req.session
  sess.guess = req.body.guess
  console.log(sess.guess)
  if (Words.checkIfGuessed(lettersGuessedArray, sess.guess)) {
    //display message you guessed this letter
    return res.redirect('/')
  }
  lettersGuessedArray.push(sess.guess)
  lettersGuessed = lettersGuessedArray.join(', ')
  if (wordArray.indexOf(sess.guess) > -1) {
    usersWordArray = Words.guessLetter(wordArray, usersWordArray, sess.guess)
  } else {
    guessesLeft -= 1
  }
  if (wordArray === usersWordArray) {
    //display user winning
  }
  if (guessesLeft === 0) {
    //display losing
  }
  usersWord = usersWordArray.join('')
  usersWord = usersWord.toUpperCase()

  res.redirect('/')
})

router.get('/', function (req, res) {
  res.render('index', {usersWord: usersWord, guessesLeft: guessesLeft, lettersGuessed: lettersGuessed})
})

module.exports = router
