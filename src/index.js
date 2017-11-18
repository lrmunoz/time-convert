import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme'
import './toolbox/theme.css'
import _ from 'lodash'

let places = _([
  ['California, USA', 'America/Los_Angeles'],
  ['Alabama, USA', 'America/Chicago'],
  ['Michigan, USA', 'America/Detroit'],
  ['Córdoba, Spain', 'Europe/Madrid'],
  ['Ahmedabad, India', 'Asia/Kolkata'],
  ['American Samoa', 'Pacific/Pago_Pago'],
  ['Kiritimati', 'Pacific/Kiritimati']
]).map((cur) => _.zipObject(['placeName', 'ianaTimezone'], cur)).value()

ReactDOM.render(<ThemeProvider theme={theme}><App places={places}/></ThemeProvider>, document.getElementById('root'))
