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
let lettersGuessed = ''
var lettersGuessedArray = []
let displayMessage = ''

router.post('/newgame', function (req, res) {
  lettersGuessedArray = []
  lettersGuessed = ''
  word = Words.generateWord()
  wordArray = word.split('')
  usersWordArray = Words.getNewWord(wordArray)
  usersWord = usersWordArray.join('')
  guessesLeft = 8
  res.redirect('/')
})

router.post('/guessletter', function (req, res) {
  sess = req.session
  sess.guess = req.body.guess.toLowerCase()
  console.log(sess.guess)
  if (Words.checkIfGuessed(lettersGuessedArray, sess.guess)) {
    displayMessage = 'You already guessed that letter. Please choose another letter'
    return res.render('index', {usersWord: usersWord, guessesLeft: guessesLeft, lettersGuessed: lettersGuessed, displayMessage: displayMessage})
  }
  lettersGuessedArray.push(sess.guess)
  lettersGuessed = lettersGuessedArray.join(', ')
  if (wordArray.indexOf(sess.guess) > -1) {
    usersWordArray = Words.guessLetter(wordArray, usersWordArray, sess.guess)
  } else {
    guessesLeft -= 1
  }
  if (usersWordArray.join('') === wordArray.join('') && guessesLeft > 0) {
    displayMessage = 'Congrats, you won! Click New Game to start another game!'
    usersWord = word.toUpperCase()
    return res.render('index', {usersWord: usersWord, guessesLeft: guessesLeft, lettersGuessed: lettersGuessed, displayMessage: displayMessage})
  }
  if (guessesLeft === 0) {
    displayMessage = 'Sorry, better luck next time. Click New Game to start another game!'
    usersWord = word.toUpperCase()
     return res.render('index', {usersWord: usersWord, guessesLeft: guessesLeft, lettersGuessed: lettersGuessed, displayMessage: displayMessage})
  }
  usersWord = usersWordArray.join('')
  usersWord = usersWord.toUpperCase()
  return res.redirect('/')
})

router.get('/', function (req, res) {
  let displayMessage = ''
  res.render('index', {usersWord: usersWord, guessesLeft: guessesLeft, lettersGuessed: lettersGuessed, displayMessage: displayMessage})
})

module.exports = router
