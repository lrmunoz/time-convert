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
// eslint-disable-next-line react/no-find-dom-node
  const appNode = ReactDOM.findDOMNode(app)
  app.addPlace('Córdoba, Spain', 'Europe/Madrid')
  expect(app.state.places).toHaveLength(1)
  expect(appNode.querySelectorAll('.TimeBox')).toHaveLength(1)
})

it('removes a place', () => {
  const div = document.createElement('div')
  let app
  ReactDOM.render(<App ref={(c) => { app = c }} />, div)
  app.addPlace('Córdoba, Spain', 'Europe/Madrid')
  app.addPlace('Palo Alto, USA', 'America/Los_Angeles')
  expect(app.state.places).toHaveLength(2)
  let closeElement = div.querySelector('.TimeBox-close')
  ReactTestUtils.Simulate.click(closeElement)
  expect(app.state.places).toHaveLength(1)
})

it('shows time is live', () => {
  const div = document.createElement('div')
  let app
  ReactDOM.render(<App ref={(c) => { app = c }} />, div)
  app.addPlace('Córdoba, Spain', 'Europe/Madrid')
  app.addPlace('Palo Alto, USA', 'America/Los_Angeles')
  expect(app.state.places).toHaveLength(2)
  expect(div.querySelector('.App-header span').innerHTML).toMatch(/Showing current time. Click the time label in any box to do a conversion/)
})

it('shows time is frozen', () => {
  const div = document.createElement('div')
  let app
  ReactDOM.render(<App ref={(c) => { app = c }} />, div)
  app.addPlace('Córdoba, Spain', 'Europe/Madrid')
  app.addPlace('Palo Alto, USA', 'America/Los_Angeles')
  expect(app.state.places).toHaveLength(2)
  let timeBox = div.querySelector('.TimeBox')
  ReactTestUtils.Simulate.click(timeBox.querySelector('.TimeBox-time a'))
  let inputTime = timeBox.querySelector('.TimeBox-time input')
  inputTime.value = '10:12'
  ReactTestUtils.Simulate.keyDown(inputTime, {key: 'Enter'})
  expect(div.querySelector('.App-header span').innerHTML).toMatch(/Time is fixed by.+Córdoba, Spain/)
  expect(div.querySelector('.App-header span a').innerHTML).toMatch(/RELEASE/)
  timeBox = div.querySelector('.TimeBox')
  expect(timeBox.getAttribute('class')).toBe('TimeBox TimeBox_highlight')
  expect(div.querySelectorAll('.TimeBox .TimeBox-timezone')[1].textContent).toMatch(/PDT \(CEST-9 hours\)/)
})

it('release frozen time', () => {
  const div = document.createElement('div')
  let app
  ReactDOM.render(<App ref={(c) => { app = c }} />, div)
  app.addPlace('Córdoba, Spain', 'Europe/Madrid')
  app.addPlace('Palo Alto, USA', 'America/Los_Angeles')
  expect(app.state.places).toHaveLength(2)
  let timeBox = div.querySelector('.TimeBox')
  ReactTestUtils.Simulate.click(timeBox.querySelector('.TimeBox-time a'))
  let inputTime = timeBox.querySelector('.TimeBox-time input')
  inputTime.value = '10:12'
  ReactTestUtils.Simulate.keyDown(inputTime, {key: 'Enter'})
  expect(div.querySelector('.App-header span').innerHTML).toMatch(/Time is fixed/)
  expect(div.querySelector('.App-header span a').innerHTML).toMatch(/RELEASE/)
  ReactTestUtils.Simulate.click(div.querySelector('.App-header span a'))
  expect(div.querySelector('.App-header span').innerHTML).not.toMatch(/Time is fixed/)
})