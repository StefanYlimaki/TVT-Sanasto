import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

import './dictionary.css'
import WordList from '../../components/wordList/WordList'
import SingleWord from '../../components/singleWord/SingleWord'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen'

function CompBasicCategory() {
  const [category, setGategory] = useState('comp_basic')
  const [search, setSearch] = useState('')
  const [word, setWord] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  let selectedWords

  useEffect(() => {
    if(localStorage.getItem('basic-comp') !== null && localStorage.getItem('internet-basic') !== null){
      setIsLoading(false)
    }
    const interval = setInterval(() => {
      if(localStorage.getItem('basic-comp') !== null && localStorage.getItem('internet-basic') !== null){
        setIsLoading(false)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

  let wordsToShow = []

  if(!isLoading){
    if (category === 'comp_basic') {
      selectedWords = JSON.parse(localStorage.getItem('basic-comp'))
    } else {
      selectedWords = JSON.parse(localStorage.getItem('internet-basic'))
    }
    wordsToShow = selectedWords.filter((w) => w.english.toLowerCase().includes(search.toLowerCase())
      || w.finnish.toLowerCase().includes(search.toLowerCase()))
  }





  return (
    <div className="dictionary">
      <div className="dictionary__header">Suomi - Englanti - Suomi</div>
      <div className="dictionary__category">
        <div className="dictionary__category-input__container">
          <div className="dictionary__category-input__container-search">
            <input
              placeholder="Hae sanaa englanniksi tai suomeksi"
              type="text"
              value={search}
              onChange={(e) => { setWord(null); setSearch(e.target.value) }}
            />
          </div>
          <div className="dictionary__category-input__container-select">
            <select
              value={category}
              onChange={(e) => { setGategory(e.target.value); setWord(null); setSearch('') }}
            >
              <option value="comp_basic">Tietotekniikan Perustermistöä</option>
              <option value="networks_basic">Internet ja Tietoverkot</option>
            </select>
          </div>
        </div>
        <div>
          {search !== '' || word
            ? (
              <div className="dictionary__category-input__container-button">
                <Button variant="outlined" onClick={() => { setWord(null); setSearch('') }}>Tyhjennä haku</Button>
              </div>
            )
            : <></>}
        </div>
      </div>
      { word
        ? <SingleWord word={word} />
        : <WordList words={wordsToShow} setSearch={setSearch} setWord={setWord} />}
    </div>
  )
}

export default CompBasicCategory