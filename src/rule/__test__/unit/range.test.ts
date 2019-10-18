import range from '../../range'

describe('Validator - Rule - Range', () => {
  const tests = [
    // Invalid types
    {value: undefined, min: 5, max: 5, expected: 'invalid'},
    {value: null, min: 5, max: 5, expected: 'invalid'},
    {value: {}, min: 5, max: 5,expected: 'invalid'},
    {value: 'text', min: 5, max: 5, expected: 'invalid'},
    {value: () => {}, min: 5, max: 5, expected: 'invalid'},
    // Valid types
    {value: 5, min: 1, max: 10, expected: true},
    {value: 1000, min: 1, max: null, expected: true},
    {value: -1000, min: undefined, max: 10, expected: true},
    // Parsed types
    {value: '5', min: 1, max: 10, expected: true},
    {value: '5.5', min: 1, max: 10, expected: true},
    // Outside range
    {value: 0, min: 1, max: 10, expected: 'invalid'},
    {value: 11, min: 1, max: 10, expected: 'invalid'},
    // Empty rule
    {value: 0, min: undefined, max: null, expected: true},
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(range('invalid', t.min, t.max)(t.value)).toBe(t.expected)
    })
  }
})