const fs = require('fs')

const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

function generateWord () {
  let newWord = words[Math.floor(Math.random() * words.length)]
  console.log('This is the new word', newWord)
  return newWord
}

function getNewWord (newWord) {
  let word = []
  for (let i = 0; i < newWord.length; i++) {
    word.push(' _ ')
  }
  return word
}

function guessLetter (wordArray, displayArray, userGuess) {
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === userGuess) {
      displayArray[i] = userGuess
    }
  }
  return displayArray
}

function checkIfGuessed (guessArray, userGuess) {
  for (var i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === userGuess) {
      return true
    }
  }
}

module.exports = {
  generateWord: generateWord,
  getNewWord: getNewWord,
  guessLetter: guessLetter,
  checkIfGuessed: checkIfGuessed
}
