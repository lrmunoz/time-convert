/* eslint-disable no-undef */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ReactTestUtils from 'react-dom/test-utils'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('has places', () => {
  const app = ReactTestUtils.renderIntoDocument(<App />)
  expect(app.state.places).toBeDefined()
})

it('has time', () => {
  const app = ReactTestUtils.renderIntoDocument(<App />)
  expect(app.state.time).toBeDefined()
})

it('sets time update', () => {
  jest.useFakeTimers()
  ReactTestUtils.renderIntoDocument(<App />)
  expect(setInterval.mock.calls.length).toBe(1)
  expect(setInterval.mock.calls[0][1]).toBe(1000)
})

it('adds a new place', () => {
  const app = ReactTestUtils.renderIntoDocument(<App />)
  app.addPlace('Córdoba, Spain', 'CEST', 2)
  expect(app.state.places).toHaveLength(1)
// eslint-disable-next-line react/no-find-dom-node
  expect(ReactDOM.findDOMNode(app).children).toHaveLength(1)
})
