import length from '../../length'

describe('Validator - Rule - Length', () => {
  test.each([
    // Invalid types
    [undefined, 5, 5, 'invalid'],
    [null, 5, 5, 'invalid'],
    [{}, 5, 5, 'invalid'],
    [() => { }, 5, 5, 'invalid'],
    // Valid types
    ['abcde', 5, 5, true],
    ['abcde', 1, 10, true],
    ['abcde', 1, null, true],
    ['abcde', undefined, 10, true],
    // Casted types
    [12345, 1, 10, true],
    [12.345, 1, 10, true],
    // Outside range
    ['abcd', 5, 5, 'invalid'],
    ['abcdef', 5, 5, 'invalid'],
    ['', 1, 10, 'invalid'],
    ['abc', 1, 2, 'invalid'],
    // Empty rule
    ['', undefined, null, true]
  ])('value %p tested on length(min: %p, max: %p) rule should evaluate as %p', (value, min, max, expected) => {
    expect(length('invalid', min, max)(value)).toBe(expected)
  })
})