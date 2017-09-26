import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme'
import './toolbox/theme.css'

let appRef = null
ReactDOM.render(<ThemeProvider theme={theme}><App ref={(c) => { appRef = c }}/></ThemeProvider>, document.getElementById('root'))
appRef.addPlace('California, USA', 'America/Los_Angeles')
appRef.addPlace('Alabama, USA', 'America/Chicago')
appRef.addPlace('Michigan, USA', 'America/Detroit')
appRef.addPlace('Córdoba, Spain', 'Europe/Madrid')
appRef.addPlace('Ahmedabad, India', 'Asia/Kolkata')
appRef.addPlace('American Samoa', 'Pacific/Pago_Pago')
appRef.addPlace('Kiritimati', 'Pacific/Kiritimati')
