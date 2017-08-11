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
      timeReferencePlace: null,
      places: []
    }
  }

  render () {
    return (
      <div className='App'>
        <div className="App-header">
          {this.state.timeReferencePlace ? <span>Time is fixed by <strong>{this.state.timeReferencePlace.placeName}</strong> <a href='javascript:void(0);' onClick={this.releaseTime}>RELEASE</a></span> : <span>{'Showing current time. Click any box time to do a conversion.'}</span>}
        </div>
        <div className="App-placesContainer">
          {this.state.places.map((place, index) => <TimeBox key={index}
                                                            {...this.getTimeBoxProperties(place)}
                                                            highlight={place === this.state.timeReferencePlace}
                                                            onClose={() => { this.removePlace(index) }}
                                                            onChangeTime={(newTime) => this.freezeTime(newTime, index)} />)}
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

  removePlace = (index) => {
    this.setState((prevState) =>
      _.assign(_.omit(prevState, 'places'), {places: _.filter(prevState.places, (place, idx) => idx !== index)}))
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
    this.setState({time: newTime, timeReferencePlace: this.state.places[index]})
  }

  releaseTime = () => {
    this.setState({time: moment(), timeReferencePlace: null})
  }
}

export default App
