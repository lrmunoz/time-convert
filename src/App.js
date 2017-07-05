import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import TimeBox from './TimeBox'
import moment from 'moment'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: new Date(),
      places: []
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.places.map((place, index) => <TimeBox key={index} {...this.getTimeBoxProperties(place)} />)}
      </div>
    )
  }

  addPlace (placeName, timezoneName, utcOffset) {
    this.setState((prevState) => {
      let newState = _.cloneDeep(prevState)
      // let newState = prevState
      newState.places.push({placeName, timezoneName, utcOffset})
      return newState
    })
  }

  getTimeBoxProperties (place) {
    return {placeName: place.placeName, time: moment.utc(this.state.time).add(place.utcOffset, 'hours').format('HH:mm'), timezone: place.timezoneName, colorGradient: {first: '#FBDA61', second: '#F76B1C'}}
  }
}

export default App
