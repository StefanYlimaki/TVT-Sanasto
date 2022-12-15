import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div>
      {message !== null ? (
        <div className="game__error">{ message }</div>
      ) : (
        <></>
      )
      }
    </div>
  )
}

export default ErrorMessage