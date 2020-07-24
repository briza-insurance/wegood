import pattern from '../../pattern'

describe('Validator - Rule - Pattern', () => {
  test.each([
    // Invalid types
    [undefined, /.*/, 'invalid'],
    [null, /.*/, 'invalid'],
    [{}, /.*/, 'invalid'],
    [() => { }, /.*/, 'invalid'],
    // Valid types
    ['email@domain.com', /^[^@]+@domain\.com/, true],
    // Casted types
    [12345, /\d+/, true],
    // Falsy
    ['@domain.com', /^[^@]+@domain\.com/, 'invalid']
  ])('value %p tested on pattern(%p) rule should evaluate as %p', (value, rx, expected) => {
    expect(pattern('invalid', rx)(value)).toBe(expected)
  })
})