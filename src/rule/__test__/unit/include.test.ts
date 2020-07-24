import include from '../../include'

describe('Validator - Rule - Include', () => {
  test.each([
    // Invalid types
    [undefined, [1, 2], 'invalid'],
    [null, [1, 2], 'invalid'],
    [{}, [1, 2], 'invalid'],
    [() => { }, [1, 2], 'invalid'],
    // Valid types
    [2, [1, 2], true],
    ['2', ['1', '2'], true],
    [true, [true, '1', 2], true],
    // Falsy
    [3, [1, 2], 'invalid'],
    ['3', ['1', '2'], 'invalid'],
    [false, [true, '1', 2], 'invalid'],
    // Empty rule
    [2, [], 'invalid']
  ])('value %p tested on include(%p) rule should evaluate as %p', (value, inclusions, expected) => {
    expect(include('invalid', inclusions)(value)).toBe(expected)
  })
})