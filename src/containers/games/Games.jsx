import React from 'react'
import './games.css'
import match_word_and_meaning_logo from '../../assets/photos/match_word_and_meaning.jpg'
import { useNavigate } from 'react-router-dom'

const Games = () => {
    const navigate = useNavigate()

  const gameTitles = [
    {
        name: "Yhdistä sana ja selitys",
        picture: match_word_and_meaning_logo
    }
  ]

  return (
    <div className='tvt__games'>
        <div className='tvt__games-selection'>
            <p>Valitse peli jota haluat pelata</p>
            <div className='tvt__games-selection_options'>
                {gameTitles.map(g => 
                    <div 
                        key={g.name} 
                        className='tvt__games-selection_option-single' 
                        onClick={() => navigate('/games/match_word_and_definition')}
                    >
                        <img src={g.picture} alt="yhdistä sana ja selitys"/>
                        <button>{g.name}</button>
                    </div>)}
            </div>
        </div>
    </div>
  )
}

export default Games