import React from 'react'

const Spinner =({text = "Wait a few seconds ..."}) => {
  return (
    <div className='spinner-container'>
        {/* <div className="spinner"></div> */}
        <div className="camera-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <p className='spinner-text'>
            {text}
        </p>
    </div>
  )
}

export default Spinner