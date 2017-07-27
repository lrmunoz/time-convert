/* eslint-disable no-undef */

import React from 'react'
import TimeBox from './TimeBox'
import { shallow, mount } from 'enzyme'
import moment from 'moment'

it('renders a representation of time at a place', () => {
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T17:36'), timezone: 'CET'}
  const timeBox = shallow(<TimeBox {...props} />)
  expect(timeBox.text()).toMatch(/Córdoba/)
  expect(timeBox.text()).toMatch(/17:36/)
  expect(timeBox.text()).toMatch(/CET/)
})

it('notifies remove clicked', () => {
  const onClose = jest.fn()
  const props = {placeName: 'Córdoba', time: moment('2017-01-01T17:36'), timezone: 'CET', onClose: onClose}
  const timeBox = mount(<TimeBox {...props} />)
  timeBox.find('a').simulate('click')
  expect(onClose.mock.calls.length).toBe(1)
})