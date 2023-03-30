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
  setGuessesLeft,
  amountOfGuesses
}) => {

  /* Function for masking a word.
   * Gets a string as input.
   * Makes word lowercased.
   * Checks the string letter by letter.
   * If a letter in question is NOT included in the guessedLetters array AND the letter is NOT ' ', ';', '(', ')', '-' ==> mask letter to '_'
   * Return the result after inspecting all the letters.
   */
  const maskWord = (word) => {
    let maskedWord = word.toLowerCase()
    for(var i = 0; i < word.length; i++){
      if(!guessedLetters.includes(word[i].toLowerCase())){
        if (![';','(',')',' ','-'].includes(word[i])){
          maskedWord = maskedWord.substring(0, i) + '_' + maskedWord.substring(i + 1)
        }
      }
    }
    return(maskedWord)
  }

  const [guessedLetters, setGuessedLetters] = useState([]) // Keeps track of the guessed letters
  const [wordToBeGuessed, setWordToBeGuessed] = useState(maskWord(randomWord)) // state variable that contains the word to be guessed (masked)
  const [roundWon, setRoundWon] = useState(false) // state variable used to store info about the round win.

  // Mask word to be guessed again and check if the game is won, every time guessedLetters array changes.
  useEffect(() => {
    setWordToBeGuessed(maskWord(randomWord))
  }, [guessedLetters])

  // Every time word to be guessed changes, check if the game is won.
  useEffect(() => {
    if(wordToBeGuessed === randomWord.toLowerCase()){
      setRoundWon(true)
      handleOpen() // Open the end-of-round modal
    }
  }, [wordToBeGuessed])

  // Function for handling clicks on the keyboard.
  const onKeyPress = (button) => {
    // If button (letter) pressed is not in the guessedLetters array, add it in there. Otherwise do nothing.
    if(!guessedLetters.includes(button)){
      setGuessedLetters(guessedLetters.concat(button))
      // After adding the letter to the array of guessedLetters, check whether the letter does NOT appear in the randomword (word to be guessed (not masked)).
      if(!randomWord.toLowerCase().includes(button)){
        // deduct one guess from the player
        setGuessesLeft(guessesLeft - 1)
        // Check if the plater loses
        if(guessesLeft === 0){
          handleOpen() // Open the end-of-round modal
        }
      }
    }
  }

  // Function used for getting the used letters in a string separated with a space ' '
  // This function is used in the keyboard element to put specific css on certain letters.
  const getUsedLetters = () => {
    return guessedLetters.toString().replaceAll(',', ' ')
  }

  // Function for adding space between the underscores of the masked word to be guessed.
  function addSpace(str) {
    // split the word to be guessed in parts
    let parts = str.split(' ')

    // for each part and space between each character.
    for(var i = 0; i < parts.length; i++){
      parts[i] = parts[i].split('').join(' ')
    }

    // join parts together with larger space in between to distinguish separate words from each other.
    const result = parts.join('\u00A0\u00A0\u00A0\u00A0')
    return <div>{result}</div>
  }

  // Function used for printing the guessed letters.
  const printGuessedLetters = () => {
    return(<div>{`${guessedLetters.toString()}`}</div>)
  }

  // Function that handles opening of the 'end-of-round' modal
  const handleOpen = () => {
    setModalOpen(true)
  }

  // Function that handles closing of the 'end-of-round' modal
  const handleClose = () => {
    setModalOpen(false)
  }

  const [modalOpen, setModalOpen] = useState(false) // Keeps track whether the modal is open or closed.

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
            Väärin menneitä arvauksia {amountOfGuesses - guessesLeft}
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