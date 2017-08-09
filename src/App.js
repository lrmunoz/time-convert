import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import TimeBox from './TimeBox'
import moment from 'moment'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: moment(),
      frozenTime: false,
      timeReferencePlaceIndex: null,
      places: []
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.places.map((place, index) => <TimeBox key={index}
                                                          {...this.getTimeBoxProperties(place)}
                                                          onClose={() => { this.removePlace(index) }}
                                                          onChangeTime={(newTime) => this.freezeTime(newTime, index)} />)}
      </div>
    )
  }

  componentDidMount () {
    setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    if (!this.state.frozenTime) this.setState({time: moment()})
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

  freezeTime = (newTime, index) => {
    this.setState({time: newTime, frozenTime: true, timeReferencePlaceIndex: index})
  }
}

export default App
