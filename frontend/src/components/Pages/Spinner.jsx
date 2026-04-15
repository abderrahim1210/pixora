import React from 'react'

const Spinner = ({ type, text = "Wait a few seconds ..." }) => {
  return (
    type === "mini" ? (<div className='mini-loader-wrapper text-center py-5 w-100'>
      <div className="custom-spinner" style={{ width: '3rem', height: '3rem' }}></div>

      <p className="mt-3 loader-text-mini">
        <strong>Pixora.</strong><br />
        <span>{text}</span>
      </p>
    </div>) : (<div className='spinner-container'>
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
    </div>)
  )
}

export default Spinner