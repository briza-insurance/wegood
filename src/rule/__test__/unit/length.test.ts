import length from '../../length'

describe('Validator - Rule - Length', () => {
  const tests = [
    // Invalid types
    {value: undefined, min: 5, max: 5, expected: 'invalid'},
    {value: null, min: 5, max: 5, expected: 'invalid'},
    {value: {}, min: 5, max: 5, expected: 'invalid'},
    {value: () => {}, min: 5, max: 5, expected: 'invalid'},
    // Valid types
    {value: 'abcde', min: 5, max: 5, expected: true},
    {value: 'abcde', min: 1, max: 10, expected: true},
    {value: 'abcde', min: 1, max: null, expected: true},
    {value: 'abcde', min: undefined, max: 10, expected: true},
    // Casted types
    {value: 12345, min: 1, max: 10, expected: true},
    {value: 12.345, min: 1, max: 10, expected: true},
    // Outside range
    {value: 'abcd', min: 5, max: 5, expected: 'invalid'},
    {value: 'abcdef', min: 5, max: 5, expected: 'invalid'},
    {value: '', min: 1, max: 10, expected: 'invalid'},
    {value: 'abc', min: 1, max: 2, expected: 'invalid'},
    // Empty rule
    {value: '', min: undefined, max: null, expected: true},
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(length('invalid', t.min, t.max)(t.value)).toBe(t.expected)
    })
  }
})