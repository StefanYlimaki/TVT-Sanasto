import React, { useState, useEffect } from 'react'
import { Button, Slider } from '@mui/material'
import MovingComponent from 'react-moving-text'

import shuffleArray from '../../../../utils/shuffleArray'
import './gameplay.css'
import Scoreboard from '../scoreboard/Scoreboard'
import { ColorRing } from 'react-loader-spinner'

function Gameplay({
  category,
  gameLenght,
  setGameRunning
}) {


  let words = []
  if (category === 'basic-comp') {
    words = JSON.parse(localStorage.getItem('basic-comp'))
  } else {
    words = JSON.parse(localStorage.getItem('internet-basic'))
  }

  const [points, setPoints] = useState(0)
  const [round, setRound] = useState(0)

  const [usedWordIndexes, setUsedWordIndexes] = useState([])
  const [usedRandomWordsIndexes, setUsedRandomWordsIndexes] = useState([])

  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [gameIsLoading, setGameIsLoading] = useState(true)

  const [randomWord, setRandomWord] = useState()
  const [optionWords, setOptionWords] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState({})

  const [definitionLength, setDefinitionLength] = useState(300)

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [options, setOptions] = useState([])

  const wordsToUse = []


  useEffect(() => {
    startGame()
  }, [])

  // function for getting a random word, which's index is not in usedWordIndexes
  const getRandomWord = (isToBeGuessed) => {
    let index = Math.floor(Math.random() * words.length) // Get random integer between 0 and lenght of words array
    if (isToBeGuessed === true) { // If word is going to be the word to guess, then check that it is not been guessed earlier in the game
      for (let i = 0; usedRandomWordsIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length)
      }
      setCorrectAnswer(words[index])
      setUsedRandomWordsIndexes(usedRandomWordsIndexes.concat(index))
    } else {
      for (let i = 0; usedWordIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length)
      }
    }
    setUsedWordIndexes(usedWordIndexes.push(index))
    return words[index]
  }

  // function for getting a filtered definition of a word
  // replaces all occurrances of a set of words in its definition
  // the set of words to replace is the word in finnish, the word in english,
  // plus the words that come from splitting above menitioned words by characters "- ,()"
  const getFilteredDefinition = (word) => {
    const wordsToFilterEnglish = word.english.toLowerCase().split(/[- ,(]+/)
    const wordsToFilterFinnish = word.finnish.toLowerCase().split(/[- ,(]+/)
    const wordsToFilter = wordsToFilterFinnish.concat(wordsToFilterEnglish)
    let filteredDefinition = word.definition.toLowerCase()
    wordsToFilter.forEach(
      (w) => (filteredDefinition = filteredDefinition.replaceAll(w, '****')),
    )
    return filteredDefinition
  }

  const startGame = () => {
    setGameIsLoading(false)
    nextRound(false)
  }


  const nextRound = (correctAnswer) => {
    if (round === gameLenght) {
      if(correctAnswer) endGame(true)
      endGame(false)
    }

    if (correctAnswer) {
      setPoints(points + 1)
    }

    setRound(round + 1)

    const newRandomWord = getRandomWord(true)
    setQuestions(questions.concat(newRandomWord))
    setRandomWord(newRandomWord)

    // get definitions to use for options in the round
    wordsToUse.push((getRandomWord(false)))
    wordsToUse.push((getRandomWord(false)))
    wordsToUse.push((newRandomWord))

    // saving options for later use
    setOptions(options.concat(wordsToUse))

    setUsedWordIndexes([])
    setOptionWords(shuffleArray(wordsToUse))
  }

  const handleClickOnOption = (word) => {
    setAnswers(answers.concat(word))
    // if selected option's (word selected) id matches with that of correct answer's
    if (word.id === correctAnswer.id) {
      nextRound(true)
    } else {
      nextRound(false)
    }
  }

  const generateGameRaport = () => {
    const raport = {
      points: points,
      rounds: round - 1,
      category_id: category,
      questions: questions,
      answers: answers,
      options: options
    }
    return raport
  }

  const endGame = () => {
    setGameHasEnded(true)
  }

  const getShortenedText = (text) => {
    const shortenedText = text.substring(0, definitionLength)
    const lastIndex = shortenedText.lastIndexOf('.')
    return shortenedText.substring(0, lastIndex + 1)
  }

  return (
    <div>
      { gameIsLoading
        ? (
          <div className='games1__loading-screen'>
            <ColorRing className = 'games1__loading-screen__colorRing'
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <div className='games1__loading-screen__spacer'></div>
            <MovingComponent className = 'games1__loading-screen__movingComponent'
              type="bounce"
              duration="1400ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="infinite"
              fillMode="none">
              Luetaan sanakirjaa...
            </MovingComponent>
          </div>)
        : ( <div>
          { gameHasEnded
            ? (<div><Scoreboard
              setGameRunning = { setGameRunning }
              points = { points }
              rounds = { gameLenght }
              raport = { generateGameRaport() }
            /></div>)
            : (<div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="game__gameplay-stats_and-text_length">
                <div className="game__gameplay-stats_and-text_length-stats">
                  <div>
                    Kierros&nbsp;
                    {round}
                    /
                    {gameLenght}
                  </div>
                  <div>
                    Pisteet&nbsp;
                    {points}
                    /
                    {round - 1}
                  </div>
                </div>
                <div className="game__gameplay-stats_and-text_length-text_length">
                  {' '}
                  Säädä vastausvaihtoehtojen pituutta
                  <Slider
                    defaultValue={300}
                    min={200}
                    max={800}
                    step={100}
                    valueLabelDisplay="auto"
                    value={definitionLength}
                    onChange={(event, value) => setDefinitionLength(value)}
                  />
                </div>
              </div>

              <div className="game__gameplay-advice">
                <div className="game__gameplay-advice_text">
                  Mikä seuraavista selityksistä sopii sanalle:
                </div>
                {randomWord !== null ? (
                  <div className="game__gameplay-advice_word">
                    {randomWord.finnish}
                    {' '}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="game__gameplay-options">
                {optionWords !== null ? (
                  <div className="game__gameplay-options_single">
                    {optionWords.map((w) => (
                      <div
                        key={w.definition}
                        className="game__gameplay-options_single-option"
                        onClick={() => handleClickOnOption(w)}
                      >
                        <p>{getShortenedText(getFilteredDefinition(w))}</p>

                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <Button onClick={() => endGame()}>Lopeta peli</Button>
            </div>)
          }
        </div>
        )}
    </div>
  )
}

export default Gameplay