import present from '../../present'

describe('Validator - Rule - Present', () => {
  test.each([
    // Truthy
    ['a', true],
    [0, true],
    [0.0, true],
    [true, true],
    [false, true],
    [[1], true],
    // Falsy
    [undefined, 'invalid'],
    [null, 'invalid'],
    ['', 'invalid'],
    [[], 'invalid']
  ])('value %p tested on present() rule should evaluate as %p', (value, expected) => {
    expect(present('invalid')(value)).toBe(expected)
  })

  test.each([
    [{}],
    [() => { }],
  ])('value %p tested on present() rule should throw an error', (value) => {
    expect(() => present('invalid')(value)).toThrowError()
  })
})