import present from '../../present'

describe('Validator - Rule - Present', () => {
  const tests = [
    // Truthy
    { value: 'a', expected: true },
    { value: 0, expected: true },
    { value: 0.0, expected: true },
    { value: true, expected: true },
    { value: false, expected: true },
    { value: [1], expected: true },
    // Falsy
    { value: undefined, expected: 'invalid' },
    { value: null, expected: 'invalid' },
    { value: '', expected: 'invalid' },
    { value: [], expected: 'invalid' },
  ]

  for (const t of tests) {
    test(`Value: ${t.value}`, () => {
      expect(present('invalid')(t.value)).toBe(t.expected)
    })
  }

  let exceptions = [
    { value: {} },
    { value: () => { } },
  ]

  for (const exception of exceptions) {
    // @ts-ignore
    expect(() => present('invalid')(exception.value)).toThrowError()
  }
})