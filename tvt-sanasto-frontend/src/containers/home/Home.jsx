import React from 'react'
import './home.css'

/**
 * Home component is responsible for rendering the Home page content
 * @returns Home screen
 */
function Home() {
  return (
    <div className="tvt__home">
      <div className="tvt__home-description">
        <p>Tämän sovelluksen tarkoituksena on selkeyttää tietotekniikan alan opiskelussa käytettyjä termejä ja lyhenteitä.</p>
        <p>
          Sovelluksessa on tällä hetkellä kaksi kategoriaa:&nbsp;
          <strong>Tietotekniikan Perustermistöä</strong>&nbsp;
          sekä&nbsp;
          <strong>Internet ja Tietoverkot</strong>
        </p>
        <br />
        <br />
        <p>
          Sovelluksen verkkoversion on kehittänyt&nbsp;
          <strong className='developer'><a href="https://www.linkedin.com/in/stefan-ylim%C3%A4ki/">Stefan Ylimäki</a></strong>
        </p>
      </div>
    </div>
  )
}

export default Home