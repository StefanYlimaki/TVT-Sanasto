import React from 'react'
import './networksBasicCategory.css'
import words from '../../assets/networks-basic.json'
import Word from '../../components/word/Word'

const NetworksBasicCategory = () => {
  return (
    <div>
      <div>
        {words.map(word => <Word key={word.id} word={ word }/>)}
      </div>
    </div>
  )
}

export default NetworksBasicCategory