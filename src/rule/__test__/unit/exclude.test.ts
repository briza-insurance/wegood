import exclude from '../../exclude'

describe('Validator - Rule - Exclude', () => {
  test.each([
    // Invalid types
    [undefined, [1, 2], 'invalid'],
    [null, [1, 2], 'invalid'],
    [{}, [1, 2], 'invalid'],
    [() => {}, [1, 2], 'invalid'],
    // Valid types
    [3, [1, 2], true],
    ['3', ['1', '2'], true],
    [false, [true, '1', 2], true],
    // Falsy
    [2, [1, 2], 'invalid'],
    ['2', ['1', '2'], 'invalid'],
    [true, [true, '1', 2], 'invalid'],
    // Empty rule
    [2, [], true],
  ])('value %p tested on exclude(%p) rule should evaluate as %p', (value, exclusions, expected) => {
    expect(exclude('invalid', exclusions)(value)).toBe(expected)
  })
})