import year from '../../year'
import {
  getISOTimezoneOffset
} from '../../date'

jest.mock('../../../common/time', () => ({
  today: () => today
}))

const today = new Date(`2000-12-30T00:00:00${getISOTimezoneOffset()}`)

describe('Validator - Rule - Year', () => {
  test.each([
    /** In range */
    // Past<->Future
    [today, -1, 1, true],
    // Today<->future
    [today, 0, 1, true],
    // Past<->current year
    [today, -1, 0, true],
    // Current year
    [today, 0, 0, true],
    // Future start
    [2001, 1, undefined, true],
    // Past end
    ['1999', undefined, -1, true],
    // Specific past<->today
    [today, 2000, 0, true],
    [today, 2000, 0, true],
    // Today<->Specific future
    [today, 0, 2001, true],
    [today, 0, 2000, true],
    // Today<->+2years
    [2002, 0, '2y', true],
    // -2years<->Today
    ['1998', '-2y', 0, true],

    /** Out of the range */
    [1999, 2000, 0, 'invalid'],
    ['2002', 0, 2001, 'invalid'],
    // Today<->no limit (future)
    [1999, 0, undefined, 'invalid'],
    // no limit (past)<->Today
    [2001, undefined, 0, 'invalid'],
    // Today<->+2years
    [2003, 0, '2y', 'invalid'],
    // -2years<->Today
    [1997, 0, '2y', 'invalid'],
    // Future start
    ['2000', 1, undefined, 'invalid'],
    // Past end
    ['2000', undefined, -1, 'invalid'],

    /** Empty rule */
    [today, undefined, null, true]
  ])('value %p tested on year(start: %p, end: %p) rule should evaluate as %p', (value, start, end, expected) => {
    expect(year('invalid', start, end)(value)).toBe(expected)
  })
})
