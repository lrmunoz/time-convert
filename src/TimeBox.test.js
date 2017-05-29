/* eslint-disable no-undef */

import React from 'react'
import ReactDOM from 'react-dom'
import TimeBox from './TimeBox'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TimeBox />, div)
})
