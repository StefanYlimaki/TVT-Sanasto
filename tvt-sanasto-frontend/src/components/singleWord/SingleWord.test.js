import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import SingleWord from './SingleWord'

test('single word renders the word, and its definition and links', () => {

  const word = {
    id: 'algorithm',
    english: 'Algorithm',
    englishLink: 'https://en.wikipedia.org/wiki/Algorithm',
    finnishLink: 'https://fi.wikipedia.org/wiki/Algoritmi',
    finnish: 'Algoritmi',
    definition: 'Yksityiskohtainen kuvaus tai ohje siitä, miten tehtävä tai prosessi suoritetaan; jota seuraamalla voidaan ratkaista tietty ongelma.'
  }

  const { container } = render(<SingleWord word={word} />)

  const div = container.querySelector('.singleword')
  expect(div).toHaveTextContent('Algoritmi')
  expect(div).toHaveTextContent('Algorithm')
  expect(div).toHaveTextContent('Yksityiskohtainen kuvaus tai ohje siitä, miten tehtävä tai prosessi suoritetaan; jota seuraamalla voidaan ratkaista tietty ongelma.')
  expect(div).toHaveTextContent('https://fi.wikipedia.org/wiki/Algoritmi')
  expect(div).toHaveTextContent('https://en.wikipedia.org/wiki/Algorithm')
})
