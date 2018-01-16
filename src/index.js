import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme'
import './toolbox/theme.css'
import { decodePlacesUrl, encodePlacesUrl } from './UrlEncoder'

const defaultPlaces = [
  {placeName: 'San Francisco, USA', ianaTimezone: 'America/Los_Angeles'},
  {placeName: 'New York, USA', ianaTimezone: 'America/New_York'},
  {placeName: 'London, UK', ianaTimezone: 'Europe/London'},
  {placeName: 'Zürich, Switzerland', ianaTimezone: 'Europe/Zurich'},
  {placeName: 'Bangalore, India', ianaTimezone: 'Asia/Kolkata'},
  {placeName: 'Tokyo, Japan', ianaTimezone: 'Asia/Tokyo'}
]

class AppContext extends React.Component {
  constructor (props) {
    super(props)
    this.state = {places: decodePlacesUrl(window.location.hash.substring(1)) || defaultPlaces}
  }

  render () {
    return <App places={this.state.places} onPlacesChange={this.handlePlacesChange} />
  }

  handlePlacesChange = (places) => {
    this.setState({places: places}, () => { window.history.pushState({}, '', '#' + encodePlacesUrl(places)) })
  }
}
ReactDOM.render(<ThemeProvider theme={theme}><AppContext/></ThemeProvider>, document.getElementById('root'))
