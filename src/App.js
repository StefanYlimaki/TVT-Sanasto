import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import { Container, Button } from '@mui/material'

import Home from "./containers/home/Home"
import SingleWord from "./components/singleWord/SingleWord";
import CompBasicCategory from "./containers/compBasicCategory/CompBasicCategory";
import NetworksBasicCategory from "./containers/networksBasicCategory/NetworksBasicCategory";

const App = () => {
  return (
    <Container>
        <div>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/comp_basic">Internet ja tietoverkot</Button>
            <Button component={Link} to="/networks_basic">Tietotekniikan perustermistöä</Button>
        </div>
        <Routes>
            <Route path='/' element={<Home /> }/>
            <Route path='/comp_basic' element={<CompBasicCategory /> }/>
            <Route path='/comp_basic/:id' element={<SingleWord /> }/>
            <Route path='/networks_basic' element={<NetworksBasicCategory /> }/>
            <Route path='/networks_basic/:id' element={<SingleWord /> }/>
        </Routes>
    </Container>
  );
};

export default App;
