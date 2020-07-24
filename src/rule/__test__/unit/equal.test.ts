import equal from '../../equal'

describe('Validator - Rule - Equal', () => {
  test.each([
    // Falsy
    [undefined, 5, 'invalid'],
    [null, 5, 'invalid'],
    [{}, 5, 'invalid'],
    ['5', 5, 'invalid'],
    [() => {}, 5, 'invalid'],
    // Truthy
    [5, 5, true],
    // Custom matcher
    [10, (value: any) => value === 5, 'invalid'],
    [5, (value: any) => value === 5, true]
  ])('value %p tested on equal(%p) rule should evaluate as %p', (value, matcher, expected) => {
    expect(equal('invalid', matcher)(value)).toBe(expected)
  })
})