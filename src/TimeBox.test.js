/* eslint-disable no-undef */

import React from 'react'
import TimeBox from './TimeBox'
import { shallow, mount } from 'enzyme'
import moment from 'moment'

it('renders a representation of time at a place', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid'}
  const timeBox = shallow(<TimeBox {...props} />)
  expect(timeBox.text()).toMatch(/Córdoba/)
  expect(timeBox.text()).toMatch(/16:36/)
  expect(timeBox.text()).toMatch(/Jan 1st/)
  expect(timeBox.text()).toMatch(/CET/)
})

it('notifies remove clicked', () => {
  const onClose = jest.fn()
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid', onClose: onClose}
  const timeBox = mount(<TimeBox {...props} />)
  timeBox.find('.TimeBox-header a').simulate('click')
  expect(onClose.mock.calls.length).toBe(1)
})

it('replaces time label for edition', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid'}
  const timeBox = mount(<TimeBox {...props} />)
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  timeBox.find('.TimeBox-time a').simulate('click')
  const timeInput = timeBox.find('.TimeBox-time input')
  expect(timeInput.length).toBe(1)
  expect(timeInput.get(0)).toEqual(document.activeElement)
})

it('empty entered time stays in edit mode', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid'}
  const timeBox = mount(<TimeBox {...props} />)
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  timeBox.find('.TimeBox-time a').simulate('click')
  const timeInput = timeBox.find('.TimeBox-time input')
  expect(timeInput.length).toBe(1)
  expect(timeInput.get(0)).toEqual(document.activeElement)
  timeInput.get(0).value = ''
  timeInput.simulate('change')
  expect(timeBox.find('.TimeBox-time input').length).toBe(1)
})

it('return to show time after input time loses focus', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid'}
  const timeBox = mount(<TimeBox {...props} />)
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  timeBox.find('.TimeBox-time a').simulate('click')
  const timeInput = timeBox.find('.TimeBox-time input')
  expect(timeInput.length).toBe(1)
  expect(timeInput.get(0)).toEqual(document.activeElement)
  timeInput.simulate('blur')
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  expect(timeBox.find('.TimeBox-time a').length).toBe(1)
})

it('shows validation error with invalid time', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid'}
  const timeBox = mount(<TimeBox {...props} />)
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  timeBox.find('.TimeBox-time a').simulate('click')
  const timeInput = timeBox.find('.TimeBox-time input')
  expect(timeInput.length).toBe(1)
  expect(timeInput.get(0)).toEqual(document.activeElement)
  timeInput.get(0).value = 'xxx'
  timeInput.simulate('change')
  expect(timeBox.find('.TimeBox-time input .invalid').length).toBe(1)
})

it('return to show time after pressing Enter with invalid time without notifying time change', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid'}
  const timeBox = mount(<TimeBox {...props} />)
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  timeBox.find('.TimeBox-time a').simulate('click')
  const timeInput = timeBox.find('.TimeBox-time input')
  expect(timeInput.length).toBe(1)
  expect(timeInput.get(0)).toEqual(document.activeElement)
  timeInput.get(0).value = 'xxx'
  timeInput.simulate('keyDown', { key: 'Enter' })
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  expect(timeBox.find('.TimeBox-time a').length).toBe(1)
})

it('notifies time change', () => {
  const onChangeTime = jest.fn()
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T15:36:00.000Z'), timezoneName: 'Europe/Madrid', onChangeTime}
  const timeBox = mount(<TimeBox {...props} />)
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  timeBox.find('.TimeBox-time a').simulate('click')
  const timeInput = timeBox.find('.TimeBox-time input')
  expect(timeInput.length).toBe(1)
  expect(timeInput.get(0)).toEqual(document.activeElement)
  timeInput.get(0).value = '10:15'
  timeInput.simulate('keyDown', { key: 'Enter' })
  expect(timeBox.find('.TimeBox-time input').length).toBe(0)
  expect(timeBox.find('.TimeBox-time a').length).toBe(1)
  expect(onChangeTime.mock.calls.length).toBe(1)
  expect(onChangeTime.mock.calls[0][0].toISOString()).toMatch(/T08:15:00.000Z/)
})