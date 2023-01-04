const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavBar from './NavBar'

test('NavBar renders routes', () => {

  const { container } = render(<NavBar />)

  const div = container.querySelector('.tvt__navbar')
  expect(div).toHaveTextContent('Sanakirja')
  expect(div).toHaveTextContent('Pelit')

  const button = screen.getByText('Sanakirja')
  userEvent.click(button)

  expect(mockedUsedNavigate.mock.calls).toHaveLength(1)

})