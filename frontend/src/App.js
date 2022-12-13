import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import axios from 'axios'

import Dictionary from './containers/dictionary/Dictionary'
import Home from './containers/home/Home'
import Games from './containers/games/Games'
import MatchWordAndDefinition from './containers/games/matchWordAndDefinition/MatchWordAndDefinition'
import './app.css'
import NavBar from './components/navbar/NavBar'
import Footer from './containers/footer/Footer'


const App = () => {
  axios.get('http://localhost:3001/api/users/')
    .then((response) => {
      console.log(response.data)
    })

  axios.get('http://localhost:3001/api/data/')
    .then((response) => {
      console.log(response.data)
      response.data.map((d) => {
        axios.get(`http://localhost:3001/api/data/${d.id}`)
          .then((response) => {
            console.log(response.data)
          })
      })
    })

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
        </Routes>
        <br />
        <br />
        <Footer />
      </div>
    </Container>
  )
}

export default App
