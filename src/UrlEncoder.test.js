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

it('encode multiple places succeeds', () => {
  expect(encodePlacesUrl([
    {placeName: 'Córdoba', ianaTimezone: 'Europe/Madrid'},
    {placeName: 'Palo Alto', ianaTimezone: 'America/Los_Angeles'}])).toBe('eyJ2IjoxLCJsIjpbeyJwIjoiQ/NyZG9iYSIsInQiOjQ1Mn0seyJwIjoiUGFsbyBBbHRvIiwidCI6MTQ2fV19')
})

it('decode a single place succeeds', () => {
  expect(decodePlacesUrl('eyJ2IjoxLCJsIjpbeyJwIjoiQ/NyZG9iYSIsInQiOjQ1Mn1dfQ==')).toEqual([{placeName: 'Córdoba', ianaTimezone: 'Europe/Madrid'}])
})

it('decode multiple places succeeds', () => {
  expect(decodePlacesUrl('eyJ2IjoxLCJsIjpbeyJwIjoiQ/NyZG9iYSIsInQiOjQ1Mn0seyJwIjoiUGFsbyBBbHRvIiwidCI6MTQ2fV19'))
  .toEqual([{placeName: 'Córdoba', ianaTimezone: 'Europe/Madrid'},
    {placeName: 'Palo Alto', ianaTimezone: 'America/Los_Angeles'}])
})

it('decode a single place with incorrect timezone fails', () => {
  expect(decodePlacesUrl('eyJ2IjoxLCJsIjpbeyJwIjoiQ/NyZG9iYSIsInQiOjEwMDAwMH1dfQ==')).toEqual(null)
})

it('decode an incorrect string fails', () => {
  expect(decodePlacesUrl('xxx')).toEqual(null)
})