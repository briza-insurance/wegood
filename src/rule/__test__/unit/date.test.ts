import date, {
  getISOTimezoneOffset
} from '../../date'

jest.mock('../../../common/time', () => ({
  today: () => today
}))

const today = new Date(`2000-12-30T00:00:00${getISOTimezoneOffset()}`)

describe('Validator - Rule - Date', () => {
  test.each([
    // Invalid types
    [undefined, 0, 0, 'invalid'],
    [null, 0, 0, 'invalid'],
    [{}, 0, 0, 'invalid'],
    ['text', 0, 0, 'invalid'],
    [() => { }, 0, 0, 'invalid'],

    /** In range */
    // Past<->Future
    [today, -1, 1, true],
    // Today<->future
    [today, 0, 1, true],
    // Past<->today
    [today, -1, 0, true],
    // Today
    [today, 0, 0, true],
    // Future start
    [new Date(`2000-12-31T00:00:00${getISOTimezoneOffset()}`), 1, undefined, true],
    // Past end
    [new Date(`2000-12-29T00:00:00${getISOTimezoneOffset()}`), undefined, -1, true],
    // Specific past<->today
    [today, '2000-12-29', 0, true],
    [today, new Date(`2000-12-29T00:00:00${getISOTimezoneOffset()}`), 0, true],
    // Today<->Specific future
    [today, 0, '2000-12-31', true],
    [today, 0, new Date(`2000-12-31T00:00:00${getISOTimezoneOffset()}`), true],
    // Today<->+3days
    [new Date(`2001-01-01T00:00:00${getISOTimezoneOffset()}`), 0, '3d', true],
    // Today<->+1week
    [new Date(`2001-01-01T00:00:00${getISOTimezoneOffset()}`), 0, '1w', true],
    // Today<->+2months
    [new Date(`2001-01-01T00:00:00${getISOTimezoneOffset()}`), 0, '2m', true],
    // Today<->+2years
    [new Date(`2001-01-01T00:00:00${getISOTimezoneOffset()}`), 0, '2y', true],
    // Future start
    [new Date(`2001-01-05T00:00:00${getISOTimezoneOffset()}`), '3d', undefined, true],
    // Future<->+3days
    [new Date(`2000-12-31T00:00:00${getISOTimezoneOffset()}`), 1, '3d', true],
    // Past end
    [new Date(`2000-12-20T00:00:00${getISOTimezoneOffset()}`), -1, '-3d', true],
    // String value
    ['2001-01-01', 0, '2y', true],
    ['2000-12-31', 1, '3d', true],

    /** Out of the range */
    [today, '2000-12-31', 0, 'invalid'],
    [today, new Date(`2000-12-31T00:00:00${getISOTimezoneOffset()}`), 0, 'invalid'],
    [today, 0, '2000-12-29', 'invalid'],
    [today, 0, new Date(`2000-12-29T00:00:00${getISOTimezoneOffset()}`), 'invalid'],
    // Today<->no limit (future)
    [new Date(`2000-12-29T00:00:00${getISOTimezoneOffset()}`), 0, undefined, 'invalid'],
    // no limit (past)<->Today
    [new Date(`2000-12-31T00:00:00${getISOTimezoneOffset()}`), undefined, 0, 'invalid'],
    // Today<->+3days
    [new Date(`2001-01-03T00:00:00${getISOTimezoneOffset()}`), 0, '3d', 'invalid'],
    // Today<->+1week
    [new Date(`2001-01-07T00:00:00${getISOTimezoneOffset()}`), 0, '1w', 'invalid'],
    // Today<->+2months
    [new Date(`2000-03-01T00:00:00${getISOTimezoneOffset()}`), 0, '2m', 'invalid'],
    // Today<->+2years
    [new Date(`2003-12-30T00:00:00${getISOTimezoneOffset()}`), 0, '2y', 'invalid'],
    // Future start
    [new Date(`2000-12-30T00:00:00${getISOTimezoneOffset()}`), 1, undefined, 'invalid'],
    [new Date(`2001-01-02T00:00:00${getISOTimezoneOffset()}`), 1, '2d', 'invalid'],
    // Past end
    [new Date(`2000-12-30T00:00:00${getISOTimezoneOffset()}`), undefined, -1, 'invalid'],
    [new Date(`2000-12-27T00:00:00${getISOTimezoneOffset()}`), '-2d', -1, 'invalid'],

    /** Empty rule */
    [today, undefined, null, true],
  ])('value %p tested on date(start: %p, end: %p) rule should evaluate as %p', (value, start, end, expected) => {
    expect(date('invalid', start, end)(value)).toBe(expected)
  })


  // Custom transformer
  test('Custom transformer', () => {
    expect(date('invalid', 0, 0, (value: string) => today)('2020-12-30')).toBe(true)
  })

  test.each([
    // Invalid ISO string
    [today, '2000-12-32', 0],
    // Invalid offset
    [today, '--5', 0],
    // Invalid value
    ['2010-13-12', 0, 0],
  ])('value %p tested on date(start: %p, end: %p) rule should throw an error', (value, start, end) => {
    expect(() => date('invalid', start, end)(value)).toThrowError()
  })

  test('provided today date', () => {
    expect(
      date('invalid', 1, '60d', undefined, new Date(`1998-07-28T00:00:00${getISOTimezoneOffset()}`)
    )(new Date(`1998-07-29T00:00:00${getISOTimezoneOffset()}`))).toBe(true)
  })
})