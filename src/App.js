import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import _ from 'lodash'
import TimeBox from './TimeBox'
import moment from 'moment'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: moment(),
      timeReferencePlace: null
    }
  }

  render () {
    return (
      <div className='App'>
        <div className="App-header">
          <div className='App-header--left'></div>
          {this.state.timeReferencePlace
            ? <div><span>Time is fixed by <strong>{this.state.timeReferencePlace.placeName}</strong> <a href='javascript:void(0);' onClick={this.releaseTime}>RELEASE</a></span></div>
            : <div><span>{'Showing current time. Click the time label in any box to do a conversion.'}</span></div>}
          <div className='App-header--right'></div>
        </div>
        <div className="App-placesContainer">
          {this.props.places.map((place, index) => {
            return <TimeBox key={index}
                            {...this.getTimeBoxProperties(place)}
                            highlight={place === this.state.timeReferencePlace}
                            referenceIanaTimezone={(this.state.timeReferencePlace || {}).ianaTimezone}
                            onClose={() => { this.removePlace(index) }}
                            onChangeTime={(newTime) => this.freezeTime(newTime, index)}/>
          })}
        </div>
      </div>
    )
  }

  componentDidMount () {
    setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    if (!this.state.timeReferencePlace) this.setState({time: moment()})
  }

  getTimeBoxProperties = (place) => _.assign(place, {time: this.state.time})

  freezeTime = (newTime, index) => {
    this.setState({time: newTime, timeReferencePlace: this.props.places[index]})
  }

  releaseTime = () => {
    this.setState({time: moment(), timeReferencePlace: null})
  }

  removePlace = (index) => {
    ;(this.props.onPlacesChange || _.identity)(_.filter(this.props.places, (cur,idx) => idx !== index))
  }
}

export default App

App.defaultProps = {
  places: []
}

App.propTypes = {
  places: PropTypes.array,
  onPlacesChange: PropTypes.func
}
