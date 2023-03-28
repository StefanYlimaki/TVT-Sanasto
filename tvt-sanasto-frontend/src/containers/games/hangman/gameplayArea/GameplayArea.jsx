import React, { useEffect, useState } from 'react'
import { Button, Input } from '@mui/material'
import './gameplayArea.css'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './keyboard.css'

const GameplayArea = ({
  randomWord,
  round,
  gameLenght,
  points,
  setGameHasEnded,
  nextRound,
  guessesLeft,
  setGuessesLeft
}) => {

  const maskWord = (word) => {
    let maskedWord = word.toLowerCase()
    for(var i = 0; i < word.length; i++){
      if(!guessedLetters.includes(word[i].toLowerCase())){
        if(' ' === word[i]){
          maskedWord = maskedWord.substring(0, i) + ' ' + maskedWord.substring(i + 1)
        } else if (![';','(',')','_','-'].includes(word[i])){
          maskedWord = maskedWord.substring(0, i) + '_' + maskedWord.substring(i + 1)
        }
      }
    }
    return(maskedWord)
  }

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wordToBeGuessed, setWordToBeGuessed] = useState(maskWord(randomWord.toLowerCase()))
  const [usedLetters, setUsedLetters] = useState()

  useEffect(() => {
    setWordToBeGuessed(maskWord(randomWord))
  }, [guessedLetters])

  useEffect(() => {
    if(wordToBeGuessed === randomWord.toLowerCase()){
      setGuessedLetters([])
      nextRound()
    }
  }, [wordToBeGuessed])

  const onKeyPress = (button) => {
    if(!guessedLetters.includes(button)){
      setGuessedLetters(guessedLetters.concat(button))
      if(!randomWord.includes(button)){
        if(guessesLeft === 1){
          setGameHasEnded(true)
        }
        setGuessesLeft(guessesLeft - 1)
      }
    }
  }

  const getUsedLetters = () => {
    return guessedLetters.toString().replaceAll(',', ' ')
  }

  function addSpace(str) {
    let parts = str.split(' ')

    for(var i = 0; i < parts.length; i++){
      parts[i] = parts[i].split('').join(' ')
    }

    const result = parts.join('\u00A0\u00A0\u00A0\u00A0')
    return <div>{result}</div>
  }

  const printGuessedLetters = () => {
    return(<div>{`${guessedLetters.toString()}`}</div>)
  }


  return (
    <div className='hangman__main'>
      <div className='hangman__info-container'>
        <div className="hangman__stats-and__text-length">
          <div className="hangman__gameplay-stats__and-text__length-stats">
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
        </div>
        <div className='hangman__infocontainer-letters'>
          <div>Voit erehtyä vielä {guessesLeft} kertaa</div>
          <div>Arvatut kirjaimet</div>
          <div>{printGuessedLetters()}</div>
        </div>
      </div>

      <div className='hangman__wordToBeGuessed'>
        {addSpace(wordToBeGuessed)}
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Keyboard
          layout={{
            default: [
              'q w e r t y u i o p å',
              'a s d f g h j k l ö ä',
              'z x c v b n m',
            ]
          }}
          buttonTheme={[
            {
              class: 'used-letters',
              buttons: `${getUsedLetters()}`
            }
          ]}
          onKeyPress={(button) => onKeyPress(button)}
        />
      </div>
      <Button onClick={() => setGameHasEnded(true)}>Lopeta peli</Button>
    </div>
  )
}


export default GameplayArea