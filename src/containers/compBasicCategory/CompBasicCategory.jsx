import React from 'react'
import './compBasicCategory.css'
import words from '../../assets/comp-basic.json'
import Word from '../../components/word/Word'

const CompBasicCategory = () => {
  return (
    <div>
      <div>
        {words.map(word => <Word key={word.id} word={ word }/>)}
      </div>
    </div>
  )
}

export default CompBasicCategory