import React from 'react'
import './singleWord.css'
import flag_united_kingdom from '../../assets/photos/flag_of_united_kingdom.jpg'
import flag_finland from '../../assets/photos/flag_of_finland.png'

/**
 * SingleWord -component is responsible for rendering a element in which the information of the word is being displayed
 * @param { word } object the word to show information of
 * @returns singleWord -component
 */

function SingleWord({ word }) {
  return (
    <div className="singleword">
      <div className="singleword__finnish">
        <img src={flag_finland} alt="flag of Finland" />
        { ` ${word.finnish}` }
      </div>
      <div className="singleword__english">
        <img src={flag_united_kingdom} alt="flag of United Kingdom" />
        <> {word.english}</>
      </div>

      <div className="singleword__definition">{ word.definition }</div>
      <div className="singleword__sources">
        <p>Lähteet:</p>
        <div className='singleword__sources-single'><a href={word.finnishLink}>{ word.finnishLink }</a></div>
        <div className='singleword__sources-single'><a href={word.englishLink}>{ word.englishLink }</a></div>
      </div>
    </div>
  )
}

export default SingleWord