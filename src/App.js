import React from "react";
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import SingleWord from "./components/singleWord/SingleWord";
import CompBasicCategory from "./containers/compBasicCategory/CompBasicCategory";
import NetworksBasicCategory from "./containers/networksBasicCategory/NetworksBasicCategory";
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
              <Route path='/comp_basic' element={<CompBasicCategory /> }/>
              <Route path='/comp_basic/:id' element={<SingleWord /> }/>
              <Route path='/networks_basic' element={<NetworksBasicCategory /> }/>
              <Route path='/networks_basic/:id' element={<SingleWord /> }/>
          </Routes>
      </div>
    </Container>
  );
};

export default App;

/*

<Container>
        <div>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/networks_basic">Internet ja tietoverkot</Button>
            <Button component={Link} to="/comp_basic">Tietotekniikan perustermistöä</Button>
        </div>
        <Routes>
            <Route path='/' element={<Home /> }/>
            <Route path='/comp_basic' element={<CompBasicCategory /> }/>
            <Route path='/comp_basic/:id' element={<SingleWord /> }/>
            <Route path='/networks_basic' element={<NetworksBasicCategory /> }/>
            <Route path='/networks_basic/:id' element={<SingleWord /> }/>
        </Routes>
    </Container>


*/