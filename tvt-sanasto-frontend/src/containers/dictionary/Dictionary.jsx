import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

import './dictionary.css'
import WordList from '../../components/wordList/WordList'
import SingleWord from '../../components/singleWord/SingleWord'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen'

/**
 * Dictionary component is responsible for the dictionary screen
 * @returns Dictionary screen
 */

function CompBasicCategory() {
  const [category, setGategory] = useState('comp_basic') // Keeps track of selected category, defaults to "comp_basic"
  const [search, setSearch] = useState('') // Keeps track of search text
  const [word, setWord] = useState(null) // Used for saving a single word. When a word is set, only the word is shown (not the list of words).
  const [isLoading, setIsLoading] = useState(true) // Is set to "false" when dictionary data is loaded. After which the screen can be rendered.

  let selectedWords // Initialising a variable to which the words of selected category will be saved.

  // Using useEffect function to check whether dictionary data is loaded to local storage.
  // After initial check, keep checking the local storage every second, until dictionary data is loaded to local storage.
  // After dictionary is loaded, set isLoading -state to "false"
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

  // If isLoading -state is true, return loading screen
  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

  let wordsToShow = [] // Initialising a variable to which the words to be showed will be saved.

  if(!isLoading){
    if (category === 'comp_basic') { // If category selected is "comp_basic"
      selectedWords = JSON.parse(localStorage.getItem('basic-comp')) // Set selectedWords to equal words from the category "comp-basic"
    } else {
      selectedWords = JSON.parse(localStorage.getItem('internet-basic')) // Otherwise set selectedWords to equal words from the category "internet-basic"
    }
    // Setting words to show to contain all the words which contain the search term language and case insensitively.
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