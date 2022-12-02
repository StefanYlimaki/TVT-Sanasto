import React from 'react'
import { useNavigate } from 'react-router-dom'

import './word.css'

const Word = ({ word }) => {
    const navigate = useNavigate()
  return (
    <div className='word' onClick={() => navigate(`/networks_basic/${word.id}`)}>
        <div className='word-english'>{ word.english }</div>
        <div className='word-finnish'>{ word.finnish }</div>
    </div>      
  )
}

export default Word