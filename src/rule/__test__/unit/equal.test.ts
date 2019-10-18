import equal from '../../equal'

describe('Validator - Rule - Equal', () => {
  const tests = [
    {value: undefined, matcher: 5, expected: 'invalid'},
    {value: null, matcher: 5, expected: 'invalid'},
    {value: {}, matcher: 5, expected: 'invalid'},
    {value: '5', matcher: 5, expected: 'invalid'},
    {value: () => {}, matcher: 5, expected: 'invalid'},
    {value: 5, matcher: 5, expected: true},
    // Custom matcher
    {value: 10, matcher: (value: any) => value === 5, expected: 'invalid'},
    {value: 5, matcher: (value: any) => value === 5, expected: true},
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(equal('invalid', t.matcher)(t.value)).toBe(t.expected)
    })
  }
})