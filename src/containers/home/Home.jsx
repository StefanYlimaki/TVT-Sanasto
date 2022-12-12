import React from 'react'
import './home.css'

const Home = () => {
  return (
    <div className='tvt__home'>
      <div className='tvt__home-description'>
        <p>Tämän sovelluksen tarkoituksena on selkeyttää tietotekniikan alan opiskelussa käytettyjä termejä ja lyhenteitä.</p>
        <p>Sovelluksessa on tällä hetkellä kaksi kategoriaa: 
        <strong>Tietotekniikan Perustermistöä</strong> sekä <strong>Internet ja Tietoverkot</strong></p>
        <br />
        <br />
        <p>Sovelluksen verkkoversion on kehittänyt <strong><a href='https://www.linkedin.com/in/stefan-ylim%C3%A4ki/'>Stefan Ylimäki</a></strong></p>
      </div>
    </div>
  )
}

export default Home