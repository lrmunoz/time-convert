import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme'
import './toolbox/theme.css'
import { decodePlacesUrl, encodePlacesUrl } from './UrlEncoder'

class AppContext extends React.Component {
  constructor (props) {
    super(props)
    this.state = {places: decodePlacesUrl(window.location.hash.substring(1)) || []}
  }

  render () {
    return <App places={this.state.places} onPlacesChange={this.handlePlacesChange} />
  }

  handlePlacesChange = (places) => {
    this.setState({places: places}, () => { window.history.pushState({}, '', '#' + encodePlacesUrl(places)) })
  }
}
ReactDOM.render(<ThemeProvider theme={theme}><AppContext/></ThemeProvider>, document.getElementById('root'))
