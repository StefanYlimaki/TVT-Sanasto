import React from 'react'
import { Button } from '@mui/material'

import LengthOfOptionSlider from '../../../../elements/LengthOfOptionSlider'
import './MWAD__gameplayArea.css'

const GameplayArea = ({
  round,
  gameLenght,
  points,
  handleOptionLengthSliderChange,
  definitionLength,
  randomWord,
  optionWords,
  handleClickOnOption,
  getShortenedText,
  getFilteredDefinition,
  endGame
}) => {
  return (
    <div className='mwad__gameplay-main'>
      <div className="mwad__stats-and__text-length">
        <div className="mwad__gameplay-stats__and-text__length-stats">
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
          <LengthOfOptionSlider handleChange = { handleOptionLengthSliderChange } value = { definitionLength }/>
        </div>
      </div>

      <div className="mwad__gameplay-advice">
        <div className="mwad__gameplay-advice_text">
                  Mikä seuraavista selityksistä sopii sanalle:
        </div>
        {randomWord !== null ? (
          <div className="mwad__gameplay-advice_word">
            {randomWord.finnish}
            {' '}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mwad__gameplay-options">
        {optionWords !== null ? (
          <div className="mwad__gameplay-options_single">
            {optionWords.map((w) => (
              <div
                key={w.definition}
                className="mwad__gameplay-options_single-option"
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
    </div>
  )
}

export default GameplayArea