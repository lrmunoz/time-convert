import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TimeBox.css'
import CloseLogo from './ic_close.svg'

export default function TimeBox (props) {
  return (
      <div className="TimeBox">
        <div className="TimeBox-daylight" style={{background: `linear-gradient(${props.colorGradient.first}, ${props.colorGradient.second})`}} />
        <div className="TimeBox-content">
          <div className="TimeBox-header" ><span>{props.placeName}</span><img src={CloseLogo}/></div>
          <div className="TimeBox-time">{props.time}</div>
          <div className="TimeBox-timezone">{props.timezone}</div>
        </div>
      </div>
  )
}

TimeBox.propTypes = {
  placeName: PropTypes.string,
  timezone: PropTypes.string,
  time: PropTypes.string,
  colorGradient: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
  })
}
