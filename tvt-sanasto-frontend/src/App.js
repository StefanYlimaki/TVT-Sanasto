import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import fetchDictionaryData from './utils/fetchDictionaryData'

import Dictionary from './containers/dictionary/Dictionary'
import Home from './containers/home/Home'
import Games from './containers/games/Games'
import MatchWordAndDefinition from './containers/games/matchWordAndDefinition/MatchWordAndDefinition'
import MatchWordAndTranslation from './containers/games/matchWordAndTranslation/MatchWordAndTranslation'
import './app.css'
import NavBar from './components/navbar/NavBar'
import Footer from './containers/footer/Footer'


const App = () => {
  useEffect(() => {
    fetchDictionaryData()
  }, [])

  return (
    <Container>
      <div className="App">
        <div className="gradient__bg">
          <NavBar />
        </div>
        <div className="homepage"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/games" element={<Games />} />
          <Route
            path="/games/match_word_and_definition"
            element={<MatchWordAndDefinition />}
          />
          <Route
            path="/games/match_word_and_translation"
            element={<MatchWordAndTranslation />}
          />
        </Routes>
        <Footer />
      </div>
    </Container>
  )    
}

export default App
