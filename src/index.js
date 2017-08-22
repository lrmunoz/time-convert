import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// eslint-disable-next-line react/no-render-return-value
const app = ReactDOM.render(<App />, document.getElementById('root'))
app.addPlace('California, USA', 'America/Los_Angeles')
app.addPlace('Alabama, USA', 'America/Chicago')
app.addPlace('Michigan, USA', 'America/Detroit')
app.addPlace('Córdoba, Spain', 'Europe/Madrid')
app.addPlace('Ahmedabad, India', 'Asia/Kolkata')
