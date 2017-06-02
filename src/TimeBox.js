import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TimeBox.css'

export default class TimeBox extends Component {
  render () {
    return (
      <div>
        <div>{this.props.placeName}</div>
        <div>{this.props.time}</div>
        <div>{this.props.timezone}</div>
      </div>
    )
  }
}

TimeBox.propTypes = {
  placeName: PropTypes.string,
  timezone: PropTypes.string,
  time: PropTypes.string
}