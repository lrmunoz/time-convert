import React from 'react'
import PropTypes from 'prop-types'
import './TimeBox.css'
import CloseLogo from './ic_close.svg'

export default function TimeBox (props) {
  return (
      <div className="TimeBox">
        <div className="TimeBox-daylight" style={{background: `linear-gradient(${props.colorGradient.first}, ${props.colorGradient.second})`}} />
        <div className="TimeBox-content">
          <div className="TimeBox-header" >
            <span>{props.placeName}</span>
            <a href="javascript:void(0);" className="TimeBox-close" onClick={props.onClose}>
              <svg>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={CloseLogo + '#close'}></use>
              </svg>
            </a>
          </div>
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
    second: PropTypes.string
  }),
  onClose: PropTypes.func
}
