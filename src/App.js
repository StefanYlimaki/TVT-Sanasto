import React from "react";
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Dictionary from "./containers/dictionary/Dictionary";

import Home from "./containers/home/Home"

import './app.css'

import NavBar from "./components/navbar/NavBar";
const App = () => {
  return ( 
    <Container>
      <div className="App">
        <div className="gradient__bg">
          <NavBar />
        </div>
        <div className="homepage">
        </div>
        <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/dictionary' element={<Dictionary /> }/>
          </Routes>
      </div>
    </Container>
  );
};

export default App;
