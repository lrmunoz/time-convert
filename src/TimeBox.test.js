/* eslint-disable no-undef */

import React from 'react'
import TimeBox from './TimeBox'
import { shallow } from 'enzyme'

it('renders a representation of time at a place', () => {
  const props = {placeName: 'Córdoba', time: '17:36', timezone: 'CET', colorGradient: {first: '#FBDA61', second: '#F76B1C'}}
  const timeBox = shallow(<TimeBox {...props} />)
  expect(timeBox.text()).toMatch(/Córdoba/)
  expect(timeBox.text()).toMatch(/17:36/)
  expect(timeBox.text()).toMatch(/CET/)
})
