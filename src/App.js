import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import TimeBox from './TimeBox'
import moment from 'moment'
import Button from 'react-toolbox/lib/button/Button'
import Dialog from 'react-toolbox/lib/dialog/Dialog'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: moment(),
      timeReferencePlace: null,
      places: [],
      showAddPlace: false
    }
  }

  handleToggle = () => {
    this.setState({showAddPlace: !this.state.showAddPlace})
  }

  render () {
    return (
      <div className='App'>
        <div className="App-header">
          <div className='App-header--left'><Button raised primary onClick={this.handleAddPlace}>Add a new place</Button></div>
          {this.state.timeReferencePlace
            ? <div><span>Time is fixed by <strong>{this.state.timeReferencePlace.placeName}</strong> <a href='javascript:void(0);' onClick={this.releaseTime}>RELEASE</a></span></div>
            : <div><span>{'Showing current time. Click the time label in any box to do a conversion.'}</span></div>}
          <div className='App-header--right'></div>
        </div>
        <div className="App-placesContainer">
          {this.state.places.map((place, index) => {
            return <TimeBox key={index}
                            {...this.getTimeBoxProperties(place)}
                            highlight={place === this.state.timeReferencePlace}
                            referenceIanaTimezone={(this.state.timeReferencePlace || {}).ianaTimezone}
                            onClose={() => { this.removePlace(index) }}
                            onChangeTime={(newTime) => this.freezeTime(newTime, index)}/>
          })}
        </div>
        <Dialog
          actions={[
            { label: "Cancel", onClick: this.handleToggle },
            { label: "Save", onClick: this.handleToggle }
          ]}
          active={this.state.showAddPlace}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Add a new place'
        >
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        </Dialog>
      </div>
    )
  }

  componentDidMount () {
    setInterval(this.updateTime, 1000)
  }

  handleAddPlace = () => {
    this.setState({showAddPlace: true})
  }

  updateTime = () => {
    if (!this.state.timeReferencePlace) this.setState({time: moment()})
  }

  removePlace = (index) => {
    this.setState((prevState) =>
      _.assign(_.omit(prevState, 'places'), {places: _.filter(prevState.places, (place, idx) => idx !== index)}))
  }

  addPlace (placeName, ianaTimezone) {
    this.setState((prevState) => {
      let newState = _.cloneDeep(prevState)
      newState.places.push({placeName, ianaTimezone})
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
