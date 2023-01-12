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

  if (category === 'comp_basic') {
    selectedWords = JSON.parse(localStorage.getItem('basic-comp'))
  } else {
    selectedWords = JSON.parse(localStorage.getItem('internet-basic'))
  }

  const wordsToShow = selectedWords.filter((w) => w.english.toLowerCase().includes(search.toLowerCase())
      || w.finnish.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="category">
      <div className="category__input">
        <div className="category__input-text">Suomi - Englanti - Suomi</div>
        <div className="category__input-box">
          <div className="category__input-box_search">
            <input
              placeholder="Hae sanaa englanniksi tai suomeksi"
              type="text"
              value={search}
              onChange={(e) => { setWord(null); setSearch(e.target.value) }}
            />
          </div>
          <div className="catogory__input-box_select">
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
              <div className="category__input-box_button">
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
