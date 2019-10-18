import include from '../../include'

describe('Validator - Rule - Include', () => {
  const tests = [
    // Invalid types
    {value: undefined, inclusions: [1, 2], expected: 'invalid'},
    {value: null, inclusions: [1, 2], expected: 'invalid'},
    {value: {}, inclusions: [1, 2], expected: 'invalid'},
    {value: () => {}, inclusions: [1, 2], expected: 'invalid'},
    // Valid types
    {value: 2, inclusions: [1, 2], expected: true},
    {value: '2', inclusions: ['1', '2'], expected: true},
    // Falsy
    {value: 3, inclusions: [1, 2], expected: 'invalid'},
    {value: '3', inclusions: ['1', '2'], expected: 'invalid'},
    // Empty rule
    {value: 2, inclusions: [], expected: 'invalid'},
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(include('invalid', t.inclusions)(t.value)).toBe(t.expected)
    })
  }
})