import exclude from '../../exclude'

describe('Validator - Rule - Exclude', () => {
  const tests = [
    // Invalid types
    {value: undefined, exclusions: [1, 2], expected: 'invalid'},
    {value: null, exclusions: [1, 2], expected: 'invalid'},
    {value: {}, exclusions: [1, 2], expected: 'invalid'},
    {value: () => {}, exclusions: [1, 2], expected: 'invalid'},
    // Valid types
    {value: 3, exclusions: [1, 2], expected: true},
    {value: '3', exclusions: ['1', '2'], expected: true},
    // Falsy
    {value: 2, exclusions: [1, 2], expected: 'invalid'},
    {value: '2', exclusions: ['1', '2'], expected: 'invalid'},
    // Empty rule
    {value: 2, exclusions: [], expected: true},
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(exclude('invalid', t.exclusions)(t.value)).toBe(t.expected)
    })
  }
})