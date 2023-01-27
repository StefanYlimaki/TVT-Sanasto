import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/photos/tvt-sanasto-logo.jpg'
import './navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="tvt__navbar">
      <div className="tvt__navbar-links">
        <div className="tvt__navbar-links_logo">
          <img src={logo} alt="logo" onClick={() => navigate('/')}/>
        </div>
        <div className="tvt__navbar-links_container">
          <button onClick={() => navigate('/dictionary')}>Sanakirja</button>
          <button onClick={() => navigate('/games')}>Pelit </button>
        </div>
      </div>
      <div className="tvt__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="tvt__navbar-menu_container scale-up-center">
            <div className="tvt__navbar-menu_container-links">
              <button onClick={() => { navigate('/dictionary'); setToggleMenu(false) }}>Sanakirja</button>
              <button onClick={() => { navigate('/games'); setToggleMenu(false) }}>Pelit </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar