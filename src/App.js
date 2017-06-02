import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: new Date(),
      places: [
      ]
    }
  }
  render () {
    return (
      <div className='App'>
      </div>
    )
  }
}

export default App
