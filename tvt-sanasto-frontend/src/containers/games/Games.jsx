import React from 'react'
import './games.css'
import { useNavigate } from 'react-router-dom'

import match_word_and_meaning_logo from '../../assets/photos/match_word_and_meaning.jpg'
import match_word_and_translation_logo from '../../assets/photos/match_word_and_translation.png'
import hangman_logo from '../../assets/photos/hangman_logo.png'

/**
 * Responsible for rendering a screen on which the game-selection is displayed.
 * Once a game is clicked on, browser should navigate to that games address.
 * @returns Games Screen of which a user can select a game to play
 */
function Games() {
  const navigate = useNavigate()

  // The information of games added are here
  const gameTitles = [
    {
      name: 'Yhdistä sana ja selitys',
      picture: match_word_and_meaning_logo,
      address: '/games/match_word_and_definition'
    },
    {
      name: 'Yhdistä sana ja käännös',
      picture: match_word_and_translation_logo,
      address: '/games/match_word_and_translation'
    },
    {
      name: 'Hirsipuupeli',
      picture: hangman_logo,
      address: '/games/hangman'
    }
  ]

  return (
    <div className="tvt__games">
      <div className="tvt__games-selection">
        <p>Valitse peli jota haluat pelata</p>
        <div className="tvt__games-selection_options">
          {gameTitles.map((g) => (
            <div
              key={g.name}
              className="tvt__games-selection_option-single"
              onClick={() => navigate(g.address)}
            >
              <img src={g.picture} alt={g.name} />
              <button>{g.name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Games