import React from 'react'
import './games.css'
import { useNavigate } from 'react-router-dom'
import match_word_and_meaning_logo from '../../assets/photos/match_word_and_meaning.jpg'
import match_word_and_translation_logo from '../../assets/photos/match_word_and_translation.png'

function Games() {
  const navigate = useNavigate()

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
