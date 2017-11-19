import { decodePlacesUrl, encodePlacesUrl } from './UrlEncoder'

it('returns no encoded url for no places', () => {
  expect(encodePlacesUrl(null)).toBe('')
  expect(encodePlacesUrl(undefined)).toBe('')
  expect(encodePlacesUrl([])).toBe('')
})

it('encode place with unknown timezone fails', () => {
  expect(encodePlacesUrl([{placeName: 'Córdoba', ianaTimezone: 'XXXXXXX'}])).toBe(null)
})

it('encode place succeeds', () => {
  expect(encodePlacesUrl([{placeName: 'Córdoba', ianaTimezone: 'Europe/Madrid'}])).toBe('eyJ2IjoxLCJsIjpbeyJwIjoiQ/NyZG9iYSIsInQiOjQ1Mn1dfQ==')
})

it('decode a single place succeeds', () => {
  expect(decodePlacesUrl('eyJ2IjoxLCJsIjpbeyJwIjoiQ/NyZG9iYSIsInQiOjQ1Mn1dfQ==')).toEqual([{placeName: 'Córdoba', ianaTimezone: 'Europe/Madrid'}])
})