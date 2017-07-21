/* eslint-disable no-undef */

import React from 'react'
import TimeBox from './TimeBox'
import { shallow, mount } from 'enzyme'

it('renders a representation of time at a place', () => {
  const props = {placeName: 'Córdoba', time: '17:36', timezone: 'CET', colorGradient: {first: '#FBDA61', second: '#F76B1C'}}
  const timeBox = shallow(<TimeBox {...props} />)
  expect(timeBox.text()).toMatch(/Córdoba/)
  expect(timeBox.text()).toMatch(/17:36/)
  expect(timeBox.text()).toMatch(/CET/)
})

it('notifies remove clicked', () => {
  const onClose = jest.fn()
  const props = {placeName: 'Córdoba', time: '17:36', timezone: 'CET', colorGradient: {first: '#FBDA61', second: '#F76B1C'}, onClose: onClose}
  const timeBox = mount(<TimeBox {...props} />)
  timeBox.find('img').simulate('click')
  expect(onClose.mock.calls.length).toBe(1)
})