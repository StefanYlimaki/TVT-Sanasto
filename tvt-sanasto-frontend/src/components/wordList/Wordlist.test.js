import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordList from './WordList'

test('The word list renders all the words, and a click on a word calls setSearch and setWord', async () => {

  const words = [
    {
      id: 'algorithm',
      english: 'Algorithm',
      englishLink: 'https://en.wikipedia.org/wiki/Algorithm',
      finnishLink: 'https://fi.wikipedia.org/wiki/Algoritmi',
      finnish: 'Algoritmi',
      definition: 'Yksityiskohtainen kuvaus tai ohje siitä, miten tehtävä tai prosessi suoritetaan; jota seuraamalla voidaan ratkaista tietty ongelma.'
    },
    {
      id: 'input',
      english: 'Input',
      englishLink: 'https://en.wikipedia.org/wiki/Input_(computer_science)',
      finnishLink: 'https://fi.wikipedia.org/wiki/Siirräntä',
      finnish: 'Syöte',
      definition: 'Syöte (siirräntä) on tiedon siirtämistä tai signaloimista tietokonelaitteiston komponenttien välillä. Syöte tarkoittaa komponentin sisään tulevaa tietoa. Esimerkiksi käyttäjän syöttämä teksti näppäimistöltä tietokoneelle on syötettä.'
    },
    {
      id: 'logic',
      english: 'Logic',
      englishLink: 'https://en.wikipedia.org/wiki/Logic',
      finnishLink: 'https://fi.wikipedia.org/wiki/Logiikka',
      finnish: 'Logiikka',
      definition: 'Tieteenala, joka tutkii päättelyn ja ajattelun muotoja, erityisesti deduktiivista päättelyä. Päättely on deduktiivista, jos se säilyttää totuuden siten, että oletusten ollessa tosia johtopäätös ei voi olla epätosi. Logiikka on perinteisesti nähty filosofian osa-alueena, mutta 1900-luvulla osa logiikan saralla tehtävästä tutkimuksesta eriytyi matematiikan osaksi. Logiikan tutkimus on myös muodostunut osaksi tietojenkäsittelytiedettä.'
    },
    {
      id: 'boolean_algebra',
      english: 'Boolean Algebra',
      englishLink: 'https://en.wikipedia.org/wiki/Boolean_algebra',
      finnishLink: 'https://fi.wikipedia.org/wiki/Boolen_algebra',
      finnish: 'Boolen algebra',
      definition: 'Algebran haara jossa muuttujien arvot ovat totuusarvot tosi ja epätosi (1 ja 0; *true* ja *false*). Pääoperaatiot ovat tavallisten laskutoimitusten (lisäys, vähennys,...) sijaan "ja" (*and*), "tai" (*or*) ja "ei" (*not*). Näiden avulla voidaan muodostaa monimutkaisempia ilmaisuja.\n\nEsimerkkinä lause "Jos on aurinkoista, tai sadevaatteet eivät ole pyykissä ja lähdet kaveriksi, menen pyöräilemään". Tämä voidaan voidaan esittää muuttujina a (on aurinkoista on true), b (sadevaatteet ovat pyykissä on true) ja c (lähdet kaveriksi on true). Tällöin boolen algebran funktio `F(a,b,c) = a or (not b and c)` kertoo lähdenkö pyöräilemään.'
    }
  ]


  const setSearchHandler = jest.fn()
  const setWordHandler = jest.fn()

  const { container } = render(<WordList words={words} setSearch={setSearchHandler} setWord={setWordHandler} />)

  const div = container.querySelector('.wordlist')
  expect(div).toHaveTextContent('Algorithm')
  expect(div).toHaveTextContent('Algoritmi')
  expect(div).toHaveTextContent('Input')
  expect(div).toHaveTextContent('Syöte')
  expect(div).toHaveTextContent('Logic')
  expect(div).toHaveTextContent('Logiikka')
  expect(div).toHaveTextContent('Boolean Algebra')
  expect(div).toHaveTextContent('Boolen algebra')

  const button = screen.getByText('Algoritmi')
  userEvent.click(button)

  expect(setSearchHandler.mock.calls).toHaveLength(1)
  expect(setWordHandler.mock.calls).toHaveLength(1)
})