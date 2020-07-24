import range from '../../range'

describe('Validator - Rule - Range', () => {
  test.each([
    // Invalid types
    [undefined, 5, 5, 'invalid'],
    [null, 5, 5, 'invalid'],
    [{}, 5, 5, 'invalid'],
    ['text', 5, 5, 'invalid'],
    [() => { }, 5, 5, 'invalid'],
    // Valid types
    [1, 1, 10, true],
    [1000, 1, null, true],
    [-1000, undefined, 10, true],
    // Parsed types
    ['5', 1, 10, true],
    ['5.5', 1, 10, true],
    // Outside range
    [0, 1, 10, 'invalid'],
    [11, 1, 10, 'invalid'],
    // Empty rule
    [0, undefined, null, true]
  ])('value %p tested on range(min: %p, max: %p) rule should evaluate as %p', (value, min, max, expected) => {
    expect(range('invalid', min, max)(value)).toBe(expected)
  })
})