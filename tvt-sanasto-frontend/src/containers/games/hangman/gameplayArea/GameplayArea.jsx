import React, { useEffect, useState } from 'react'
import { Button, Input } from '@mui/material'
import './gameplayArea.css'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'


const GameplayArea = ({
  randomWord,
  round,
  gameLenght,
  points,
  setGameHasEnded,
  nextRound
}) => {

  console.log(randomWord)

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
    setGuessedLetters(guessedLetters.concat(button))
  }

  function addSpace(str) {
    let parts = str.split(' ')

    for(var i = 0; i < parts.length; i++){
      parts[i] = parts[i].split('').join(' ')
    }

    const result = parts.join('\u00A0\u00A0\u00A0\u00A0')
    return <div>{result}</div>
  }

  return (
    <div className='hangman__main'>
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
          <div>Huom! Arvattava sana on englanniksi</div>
        </div>
      </div>
      <div className='hangman__wordToBeGuessed'>
        {addSpace(wordToBeGuessed)}
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Keyboard
          layout={layoutObject}
          onKeyPress={(button) => onKeyPress(button)}
        />
      </div>
      <Button onClick={() => setGameHasEnded(true)}>Lopeta peli</Button>
    </div>
  )
}

const layoutObject = {
  'default': [
    'q w e r t y u i o p å',
    'a s d f g h j k l ö ä',
    'z x c v b n m',
  ],
  'shift': [
    '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
    '.com @ {space}'
  ]
}

export default GameplayArea