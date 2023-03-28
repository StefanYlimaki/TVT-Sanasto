import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import './gameplayArea.css'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './keyboard.css'
import hangmanGif from '../../../../assets/photos/hangmanGif.gif'
import winner from '../../../../assets/photos/winner.gif'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '250px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

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
  const [roundWon, setRoundWon] = useState(false)

  useEffect(() => {
    setWordToBeGuessed(maskWord(randomWord))
  }, [guessedLetters])

  useEffect(() => {
    if(wordToBeGuessed === randomWord.toLowerCase()){
      setRoundWon(true)
      handleOpen()
    }
  }, [wordToBeGuessed])

  const onKeyPress = (button) => {
    if(!guessedLetters.includes(button)){
      setGuessedLetters(guessedLetters.concat(button))
      if(!randomWord.includes(button)){
        if(guessesLeft === 1){
          handleOpen()
          //setGameHasEnded(true)
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

  const handleOpen = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const [modalOpen, setModalOpen] = useState(false)

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
      <Modal
        open={modalOpen}
      >
        <Box sx={style}>
          {roundWon ? <img src={winner} /> : <img src={hangmanGif} alt="hangman_gif" width="250" />}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {roundWon ? 'Oikein meni!' : 'Hirteen päädyit!'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sana oli { randomWord }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Väärin menneitä arvauksia {6 - guessesLeft}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button  color='warning' onClick={() => {
              if(roundWon){
                nextRound(true)
              } else {
                nextRound(false)
              }
              setGameHasEnded(true)
              setGameHasEnded(true)
            }}>Lopeta peli</Button>
            <Button variant='contained' color='success' onClick={() => {
              setGuessedLetters([])
              handleClose()
              if(roundWon){
                nextRound(true)
              } else {
                nextRound(false)
              }
            }}>Jatka</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}


export default GameplayArea