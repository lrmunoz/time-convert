/* eslint-disable no-undef */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ReactTestUtils from 'react-dom/test-utils'
import _ from 'lodash'

let parentComponent
let dateNow = Date.now
function renderIntoParent (child) {
  ReactDOM.render(child, parentComponent)
}

beforeEach(() => {
  parentComponent = document.createElement('div')
  Date.now = jest.fn(() => new Date(Date.UTC(2017, 8, 1)).valueOf())
})

afterEach(() => {
  ReactDOM.unmountComponentAtNode(parentComponent)
  Date.now = dateNow
})

it('renders without crashing', () => {
  renderIntoParent(<App />)
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

it('renders a place', () => {
  renderIntoParent(<App places={[{placeName: 'Córdoba, Spain', ianaTimezone: 'Europe/Madrid'}]}/>)
  expect(parentComponent.querySelectorAll('.TimeBox')).toHaveLength(1)
})

it('removes a place', () => {
  const placesChangeHandler = jest.fn()
  let places = _([
    ['Córdoba, Spain', 'Europe/Madrid'],
    ['Palo Alto, USA', 'America/Los_Angeles']
  ]).map((cur) => _.zipObject(['placeName', 'ianaTimezone'], cur)).value()
  renderIntoParent(<App places={places} onPlacesChange={placesChangeHandler} />)
  expect(parentComponent.querySelectorAll('.TimeBox')).toHaveLength(2)
  let closeElement = parentComponent.querySelector('.TimeBox-close')
  ReactTestUtils.Simulate.click(closeElement)
  expect(placesChangeHandler.mock.calls.length).toBe(1)
  expect(_.map(placesChangeHandler.mock.calls[0][0], cur => _.omit(cur, 'time'))).toEqual([{ianaTimezone: 'America/Los_Angeles', placeName: 'Palo Alto, USA'}])
})

it('shows time is live', () => {
  let places = _([
    ['Córdoba, Spain', 'Europe/Madrid'],
    ['Palo Alto, USA', 'America/Los_Angeles']
  ]).map((cur) => _.zipObject(['placeName', 'ianaTimezone'], cur)).value()
  renderIntoParent(<App places={places} />)
  expect(parentComponent.querySelectorAll('.TimeBox')).toHaveLength(2)
  expect(parentComponent.querySelector('.App-header .App-header--center span').innerHTML).toMatch(/Showing current time. Click the time label in any box to do a conversion/)
})

it('shows time is frozen', () => {
  let places = _([
    ['Córdoba, Spain', 'Europe/Madrid'],
    ['Palo Alto, USA', 'America/Los_Angeles']
  ]).map((cur) => _.zipObject(['placeName', 'ianaTimezone'], cur)).value()
  renderIntoParent(<App places={places} />)
  expect(parentComponent.querySelectorAll('.TimeBox')).toHaveLength(2)
  let timeBox = parentComponent.querySelector('.TimeBox')
  ReactTestUtils.Simulate.click(timeBox.querySelector('.TimeBox-time a'))
  let inputTime = timeBox.querySelector('.TimeBox-time input')
  inputTime.value = '10:12'
  ReactTestUtils.Simulate.keyDown(inputTime, {key: 'Enter'})
  expect(parentComponent.querySelector('.App-header .App-header--center span').innerHTML).toMatch(/Time is fixed by.+Córdoba, Spain/)
  expect(parentComponent.querySelector('.App-header .App-header--center span a').innerHTML).toMatch(/RELEASE/)
  timeBox = parentComponent.querySelector('.TimeBox')
  expect(timeBox.getAttribute('class')).toBe('TimeBox TimeBox_highlight')
  expect(parentComponent.querySelectorAll('.TimeBox .TimeBox-timezone')[1].textContent).toMatch(/PDT \(CEST-9 hours\)/)
})

it('release frozen time', () => {
  let places = _([
    ['Córdoba, Spain', 'Europe/Madrid'],
    ['Palo Alto, USA', 'America/Los_Angeles']
  ]).map((cur) => _.zipObject(['placeName', 'ianaTimezone'], cur)).value()
  renderIntoParent(<App places={places} />)
  expect(parentComponent.querySelectorAll('.TimeBox')).toHaveLength(2)
  let timeBox = parentComponent.querySelector('.TimeBox')
  ReactTestUtils.Simulate.click(timeBox.querySelector('.TimeBox-time a'))
  let inputTime = timeBox.querySelector('.TimeBox-time input')
  inputTime.value = '10:12'
  ReactTestUtils.Simulate.keyDown(inputTime, {key: 'Enter'})
  expect(parentComponent.querySelector('.App-header .App-header--center span').innerHTML).toMatch(/Time is fixed/)
  expect(parentComponent.querySelector('.App-header .App-header--center span a').innerHTML).toMatch(/RELEASE/)
  ReactTestUtils.Simulate.click(parentComponent.querySelector('.App-header span a'))
  expect(parentComponent.querySelector('.App-header span').innerHTML).not.toMatch(/Time is fixed/)
})

it('has place selection dropdown', () => {
  renderIntoParent(<App places={[]} />)
  expect(parentComponent.querySelectorAll('.App-header--searchPlace').length).toBe(1)
})
