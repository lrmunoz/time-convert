/* eslint-disable no-undef */

import React from 'react'
import { shallow } from 'enzyme'
import SkyGradient from './SkyGradient'

it('renders without crashing', () => {
  shallow(<SkyGradient />)
})

it('renders undefined hour', () => {
  const c = shallow(<SkyGradient/>)
  expect(c.hasClass('sky-gradient-incorrect')).toBe(true)
})

it('renders correct gradient for time of day', () => {
  for (let i = 0; i < 24; i++) {
    const c = shallow(<SkyGradient hourOfDay={i}/>)
    expect(c.hasClass('sky-gradient-' + i)).toBe(true)
  }
})
