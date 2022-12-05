import React from 'react'
import { useParams as getParams } from 'react-router-dom'

import networks_basic from '../../assets/networks-basic.json'
import comp_basic from '../../assets/comp-basic.json'
import './singleWord.css'

const words = networks_basic.concat(comp_basic)

console.log(words)

const singleWord = () => {
    const { id } = getParams()
    const word = words.find(word => word.id === id)
  return (
    <div className='singleword'>
        <div className='singleword__word'>
            <div className='singleword__finnish'>{ word.finnish }</div>
            <div className='singleword__english'>{ word.english }</div>
        </div>
        <div className='singleword__definition'>{ word.definition }</div>
        <div>Lähteet</div>
        <div><a href={word.finnishLink}>{word.finnishLink}</a></div>
        <div><a href={word.englishLink}>{word.englishLink}</a></div>
    </div>
  )
}

export default singleWord