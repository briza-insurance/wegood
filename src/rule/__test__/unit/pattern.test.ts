import pattern from '../../pattern'

describe('Validator - Rule - Pattern', () => {
  const tests = [
    // Invalid types
    { value: undefined, rx: /.*/, expected: 'invalid' },
    { value: null, rx: /.*/, expected: 'invalid' },
    { value: {}, rx: /.*/, expected: 'invalid' },
    { value: () => { }, rx: /.*/, expected: 'invalid' },
    // Valid types
    { value: 'email@domain.com', rx: /^[^@]+@domain\.com/, expected: true },
    // Casted types
    { value: 12345, rx: /\d+/, expected: true },
    // Falsy
    { value: '@domain.com', rx: /^[^@]+@domain\.com/, expected: 'invalid' },
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(pattern('invalid', t.rx)(t.value)).toBe(t.expected)
    })
  }
})