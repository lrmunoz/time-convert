import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import TimeBox from './TimeBox'
import moment from 'moment'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: Date.now(),
      places: []
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.places.map((place, index) => <TimeBox key={index}
                                                          {...this.getTimeBoxProperties(place)}
                                                          onClose={() => { this.removePlace(index) }}
                                                          onChangeTime={(newTime) => console.log('>>> newTime', newTime)} />)}
      </div>
    )
  }

  componentDidMount () {
    setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    this.setState({time: Date.now()})
  }

  removePlace = (index) => {
    this.setState((prevState) => _.assign(_.omit(prevState, 'places'), {places: _.filter(prevState.places, (place, idx) => idx !== index)}))
  }

  addPlace (placeName, timezoneName, utcOffset) {
    this.setState((prevState) => {
      let newState = _.cloneDeep(prevState)
      newState.places.push({placeName, timezoneName, utcOffset})
      return newState
    })
  }

  getTimeBoxProperties = (place) => _.assign(place, {time: this.state.time})
}

export default App
