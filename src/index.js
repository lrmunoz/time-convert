import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme'
import './toolbox/theme.css'
import { decodePlacesUrl, encodePlacesUrl } from './UrlEncoder'

ReactDOM.render(<ThemeProvider theme={theme}><App places={decodePlacesUrl(window.location.hash.substring(1)) || []}/></ThemeProvider>, document.getElementById('root'))
