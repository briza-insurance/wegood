import year from '../../year'
import {
  getISOTimezoneOffset
} from '../../date'

jest.mock('../../../common/time', () => ({
  today: () => today
}))

const today = new Date(`2000-12-30T00:00:00${getISOTimezoneOffset()}`)

describe('Validator - Rule - Year', () => {
  const tests = [
    // Invalid types
    // { value: undefined, start: 0, end: 0, expected: 'invalid' },
    // { value: null, start: 0, end: 0, expected: 'invalid' },
    // { value: {}, start: 0, end: 0, expected: 'invalid' },
    // { value: 'text', start: 0, end: 0, expected: 'invalid' },
    // { value: () => { }, start: 0, end: 0, expected: 'invalid' },

    /** In range */
    // Past<->Future
    { value: today, start: -1, end: 1, expected: true },
    // Today<->future
    { value: today, start: 0, end: 1, expected: true },
    // Past<->current year
    { value: today, start: -1, end: 0, expected: true },
    // Current year
    { value: today, start: 0, end: 0, expected: true },
    // Future start
    { value: 2001, start: 1, end: undefined, expected: true },
    // Past end
    { value: '1999', start: undefined, end: -1, expected: true },
    // Specific past<->today
    { value: today, start: 2000, end: 0, expected: true },
    {
      value: today,
      start: 2000, end: 0,
      expected: true
    },
    // Today<->Specific future
    { value: today, start: 0, end: 2001, expected: true },
    {
      value: today,
      start: 0, end: 2000,
      expected: true
    },
    // Today<->+2years
    {
      value: 2002,
      start: 0, end: '2y',
      expected: true
    },
    // -2years<->Today
    {
      value: '1998',
      start: '-2y', end: 0,
      expected: true
    },

    /** Out of the range */
    { value: 1999, start: 2000, end: 0, expected: 'invalid' },
    { value: '2002', start: 0, end: 2001, expected: 'invalid' },
    // Today<->no limit (future)
    {
      value: 1999,
      start: 0, end: undefined,
      expected: 'invalid'
    },
    // no limit (past)<->Today
    {
      value: 2001,
      start: undefined, end: 0,
      expected: 'invalid'
    },
    // Today<->+2years
    {
      value: 2003,
      start: 0, end: '2y',
      expected: 'invalid'
    },
    // -2years<->Today
    {
      value: 1997,
      start: 0, end: '2y',
      expected: 'invalid'
    },
    // Future start
    {
      value: '2000',
      start: 1,
      end: undefined,
      expected: 'invalid'
    },
    // Past end
    {
      value: '2000',
      start: undefined,
      end: -1,
      expected: 'invalid'
    },

    /** Empty rule */
    { value: today, start: undefined, end: null, expected: true }
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(year('invalid', t.start, t.end)(t.value)).toBe(t.expected)
    })
  }
})
