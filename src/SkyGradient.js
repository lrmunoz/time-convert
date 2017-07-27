import React from 'react'
import PropTypes from 'prop-types'
import './SkyGradient.css'
import _ from 'lodash'

function calculateClass (hourOfDay) {
  if (hourOfDay === undefined || hourOfDay === null) return 'sky-gradient-incorrect'
  if (hourOfDay < 0 || hourOfDay > 23) return 'sky-gradient-incorrect'
  return 'sky-gradient-' + hourOfDay
}

export default function SkyGradient (props) { return <div className={_.compact([props.className, calculateClass(props.hourOfDay)]).join(' ')} /> }

SkyGradient.propTypes = {
  className: PropTypes.string,
  hourOfDay: PropTypes.number
}