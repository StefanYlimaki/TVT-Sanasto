import React, { useState, useEffect } from 'react'

import shuffleArray from '../../../../utils/shuffleArray'
import LoadingScreen from '../../../../components/loadingScreen/LoadingScreen'
import Scoreboard from '../scoreboard/Scoreboard'
import GameplayArea from '../gameplayArea/GameplayArea'

function Gameplay({
  category,
  gameLenght,
  setGameRunning,
  languages
}) {

  console.log(languages)

  let words = []
  if (category === 'basic-comp') {
    words = JSON.parse(localStorage.getItem('basic-comp'))
  } else {
    words = JSON.parse(localStorage.getItem('internet-basic'))
  }

  const [points, setPoints] = useState(-1)
  const [round, setRound] = useState(0)

  const [usedWordIndexes, setUsedWordIndexes] = useState([])

  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [gameIsLoading, setGameIsLoading] = useState(true)

  const [randomWord, setRandomWord] = useState()

  const wordsToUse = []

  useEffect(() => {
    startGame()
  }, [])

  // function for getting a random word, which's index is not in usedWordIndexes
  const getRandomWord = () => {
    let index = Math.floor(Math.random() * words.length) // Get random integer between 0 and lenght of words array
    for (let i = 0; usedWordIndexes.includes(index); i++) {
      index = Math.floor(Math.random() * words.length)
    }
    setUsedWordIndexes(usedWordIndexes.concat(index))

    if(languages.length === 2){
      console.log(Math.round(Math.random()))
      if(Math.round(Math.random())){
        return words[index].english
      } else {
        return words[index].finnish
      }
    } else if( languages.includes('finnish')) {
      return words[index].finnish
    } else {
      return words[index].english
    }
  }

  const startGame = () => {
    setGameIsLoading(false)
    nextRound()
  }

  const nextRound = () => {
    setPoints(points + 1)
    setRound(round + 1)

    console.log(round, gameLenght)

    if(round >= gameLenght){
      setGameHasEnded(true)
    }

    const word = getRandomWord()
    setRandomWord(word)
  }

  return (
    <div>
      { gameIsLoading
        ? (
          <LoadingScreen />
        )
        : ( <div>
          { gameHasEnded
            ? (<Scoreboard
              setGameRunning = { setGameRunning }
              points = { points }
              rounds = { gameLenght }
            />)
            : (
              <GameplayArea
                round = { round }
                gameLenght = { gameLenght }
                points = { points }
                randomWord = { randomWord }
                nextRound = { nextRound }
                setGameHasEnded = { setGameHasEnded }
              />)
          }
        </div>
        )}
    </div>
  )
}

export default Gameplay