import date from '../../date'
import {getToday, exported} from '../../date'

describe('Validator - Rule - Date', () => {
  const today = new Date('2000-12-30T00:00:00+00:00')

  // Get today in ISO, reset hours
  test('getToday', () => {
    expect(getToday().getTime())
      .toBe(new Date((new Date()).setHours(0, 0, 0, 0)).getTime())
  })

  // Mock the function to return the fixed today date
  exported.getToday = jest.fn(() => today)

  const tests = [
    // Invalid types
    {value: undefined, start: 0, end: 0, expected: 'invalid'},
    {value: null, start: 0, end: 0, expected: 'invalid'},
    {value: {}, start: 0, end: 0, expected: 'invalid'},
    {value: 'text', start: 0, end: 0, expected: 'invalid'},
    {value: () => {}, start: 0, end: 0, expected: 'invalid'},
    
    /** In range */
    // Past<->Future
    {value: today, start: -1, end: 1, expected: true},
    // Today<->future
    {value: today, start: 0, end: 1, expected: true},
    // Past<->today
    {value: today, start: -1, end: 0, expected: true},
    // Today
    {value: today, start: 0, end: 0, expected: true},
    // Future start
    {value: new Date('2000-12-31T00:00:00+00:00'), start: 1, end: undefined, expected: true},
    // Past end
    {value: new Date('2000-12-29T00:00:00+00:00'), start: undefined, end: -1, expected: true},
    // Specific past<->today
    {value: today, start: '2000-12-29', end: 0, expected: true},
    {
      value: today,
      start: new Date('2000-12-29T00:00:00+00:00'), end: 0,
      expected: true
    },
    // Today<->Specific future
    {value: today, start: 0, end: '2000-12-31', expected: true},
    {
      value: today,
      start: 0, end: new Date('2000-12-31T00:00:00+00:00'),
      expected: true
    },
    // Today<->+3days
    {
      value: new Date('2001-01-01T00:00:00+00:00'),
      start: 0, end: '3d',
      expected: true
    },
    // Today<->+1week
    {
      value: new Date('2001-01-01T00:00:00+00:00'),
      start: 0, end: '1w',
      expected: true
    },
    // Today<->+2months
    {
      value: new Date('2001-01-01T00:00:00+00:00'),
      start: 0, end: '2m',
      expected: true
    },
    // Today<->+2years
    {
      value: new Date('2001-01-01T00:00:00+00:00'),
      start: 0, end: '2y',
      expected: true
    },
    // Future start
    {
      value: new Date('2001-01-05T00:00:00+00:00'),
      start: '3d', end: undefined,
      expected: true
    },
    // Future<->+3days
    {
      value: new Date('2000-12-31T00:00:00+00:00'),
      start: 1, end: '3d',
      expected: true
    },
    // Past end
    {
      value: new Date('2000-12-20T00:00:00+00:00'),
      start: -1, end: '-3d',
      expected: true
    },
    // String value
    {value: '2001-01-01', start: 0, end: '2y', expected: true},

    /** Out of the range */
    {value: today, start: '2000-12-31', end: 0, expected: 'invalid'},
    {
      value: today,
      start: new Date('2000-12-31T00:00:00+00:00'), end: 0,
      expected: 'invalid'
    },
    {value: today, start: 0, end: '2000-12-29', expected: 'invalid'},
    {
      value: today,
      start: 0, end: new Date('2000-12-29T00:00:00+00:00'),
      expected: 'invalid'
    },
    // Today<->no limit (future)
    {
      value: new Date('2000-12-29T00:00:00+00:00'),
      start: 0, end: undefined,
      expected: 'invalid'
    },
    // no limit (past)<->Today
    {
      value: new Date('2000-12-31T00:00:00+00:00'),
      start: undefined, end: 0,
      expected: 'invalid'
    },
    // Today<->+3days
    {
      value: new Date('2001-01-03T00:00:00+00:00'),
      start: 0, end: '3d',
      expected: 'invalid'
    },
    // Today<->+1week
    {
      value: new Date('2001-01-07T00:00:00+00:00'),
      start: 0, end: '1w',
      expected: 'invalid'
    },
    // Today<->+2months
    {
      value: new Date('2000-03-01T00:00:00+00:00'),
      start: 0, end: '2m',
      expected: 'invalid'
    },
    // Today<->+2years
    {
      value: new Date('2003-12-30T00:00:00+00:00'),
      start: 0, end: '2y',
      expected: 'invalid'
    },
    // Future start
    {
      value: new Date('2000-12-30T00:00:00+00:00'),
      start: 1,
      end: undefined,
      expected: 'invalid'
    },
    {
      value: new Date('2001-01-02T00:00:00+00:00'),
      start: 1,
      end: '2d',
      expected: 'invalid'
    },
    // Past end
    {
      value: new Date('2000-12-30T00:00:00+00:00'),
      start: undefined,
      end: -1,
      expected: 'invalid'
    },
    {
      value: new Date('2000-12-27T00:00:00+00:00'),
      start: '-2d',
      end: -1,
      expected: 'invalid'
    },

    /** Empty rule */
    {value: today, start: undefined, end: null, expected: true},
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(date('invalid', t.start, t.end)(t.value)).toBe(t.expected)
    })
  }

  // Custom transformer
  test('Custom transformer', () => {
    expect(date(
      'invalid',
      0,
      0,
      (value: string) => today
    )('2020-12-30')).toBe(true)
  })

  let exceptions = [
    // Invalid ISO string
    {value: today, start: '2000-12-32', end: 0},
    // Invalid offset
    {value: today, start: '--5', end: 0},
    // Invalid value
    {value: '2010-13-12', start: 0, end: 0},
  ]

  for (const exception of exceptions) {
    // @ts-ignore
    expect(
      () => date('invalid', exception.start, exception.end)(exception.value)
    ).toThrowError()
  }
})