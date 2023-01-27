import React from 'react'
import { Button } from '@mui/material'
import './MWAT__gameplayArea.css'

const GameplayArea = ({
  round,
  gameLenght,
  points,
  randomWord,
  optionWords,
  getWordToBeGuessed,
  handleClickOnOption,
  getWordToBeOption,
  endGame
}) => {
  return (
    <div className="mwat__gameplay-main">
      <div className="mwat__stats-and__text-length">
        <div className="mwat__gameplay-stats__and-text__length-stats">
          <div>
            Kierros&nbsp;
            {round}/{gameLenght}
          </div>
          <div>
            Pisteet&nbsp;
            {points}/{round - 1}
          </div>
        </div>
      </div>

      <div className="mwat__gameplay-advice">
        <div className="mwat__gameplay-advice_text">
          Mikä seuraavista käännöksistä sopii sanalle:
        </div>
        {randomWord !== null ? (
          <div className="mwat__gameplay-advice_word">
            {getWordToBeGuessed(randomWord)}{' '}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mwat__gameplay-options">
        {optionWords !== null ? (
          <div className="mwat__gameplay-options_single">
            {optionWords.map((w) => (
              <div
                key={w.english}
                className="mwat__gameplay-options_single-option"
                onClick={() => handleClickOnOption(w)}
              >
                <p>{getWordToBeOption(w)}</p>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Button variant="contained" onClick={() => endGame()}>
        Lopeta peli
      </Button>
    </div>
  )
}

export default GameplayArea