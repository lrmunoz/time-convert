import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// eslint-disable-next-line react/no-render-return-value
const app = ReactDOM.render(<App />, document.getElementById('root'))
app.addPlace('Ahmedabad, India', 'IST', 5.5)
app.addPlace('Córdoba, Spain', 'CEST', 2)
app.addPlace('Michigan, USA', 'EDT', -5)
app.addPlace('Ala./Minn., USA', 'CDT', -6)
app.addPlace('California, USA', 'PDT', -7)
