import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/depositphotos_471130528-stock-illustration-book-yellow-glowing-neon-icon.jpg'
import './navbar.css';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="tvt__navbar">
      <div className="tvt__navbar-links">
        <div className="tvt__navbar-links_logo">
          <img src={logo} alt="logo" onClick={() => navigate('/')}/>
        </div>
        <div className="tvt__navbar-links_container">
          <Button component={Link} to="/dictionary">Sanakirja </Button>
        </div>
      </div>
      <div className="tvt__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="tvt__navbar-menu_container scale-up-center">
          <div className="tvt__navbar-menu_container-links">
          <Button component={Link} to="/dictionary">Sanakirja </Button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;