import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// eslint-disable-next-line react/no-render-return-value
const app = ReactDOM.render(<App />, document.getElementById('root'))
app.addPlace('Córdoba, Spain', 'CEST', 2)
registerServiceWorker()
