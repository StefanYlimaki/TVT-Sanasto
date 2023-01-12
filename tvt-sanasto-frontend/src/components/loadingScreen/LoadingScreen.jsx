import React from 'react'
import './loadingScreen.css'

import MovingComponent from 'react-moving-text'
import { ColorRing } from 'react-loader-spinner'

const LoadingScreen = () => {
  return (
    <div className='loadingScreen'>
      <ColorRing className = 'loadingScreen__colorRing'
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <div className='loadingScreen__spacer'></div>
      <MovingComponent className = 'loadingScreen__movingComponent'
        type="bounce"
        duration="1400ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="infinite"
        fillMode="none">
        Luetaan sanakirjaa...
      </MovingComponent>
    </div>
  )
}

export default LoadingScreen