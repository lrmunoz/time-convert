/* eslint-disable no-undef */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ReactTestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('has places', () => {
  const app = ReactTestUtils.renderIntoDocument(<App />)
  expect(app.state.places).toBeDefined()
})