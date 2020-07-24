import Validator from '../../'
import { ValidationRule } from '../../rule'
import equal from '../../rule/equal'

describe('Validator', () => {
  test('rules should be accessible via rules getter', () => {
    const rule = equal('invalid', 5)
    expect(new Validator([rule]).rules[0]).toBe(rule)
  })

  describe('constructor', () => {
    test.each([
      [[]],
      [[5]],
      [[{}]],
      [['rule']]
    ])('new Validator(%p) should throw an error', (rules) => {
      expect(() => new Validator(rules as ValidationRule[])).toThrowError()
    })
  })

  describe('validate', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])

    test.each([
      // Valid
      [5, true, { valid: true, errors: [] }],
      [5, false, { valid: true, errors: [] }],
      // Invalid
      ['1', true, { valid: false, errors: ['a'] }],
      ['1', false, { valid: false, errors: ['a', 'b'] }]
    ])('%p value (firstErrorOnly: %p) should evaluate as %o', (value, firstErrorOnly, expected) => {
      expect(validator.validate(value, firstErrorOnly)).toEqual(expected)
    })
  })

  describe('valid', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])

    test.each([
      // Valid
      [5, true],
      // Invalid
      ['1', false],
    ])('%p value should evaluate as %p', (value, expected) => {
      expect(validator.valid(value)).toEqual(expected)
    })
  })

  describe('errors', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])

    test.each([
      // Valid
      [5, true, []],
      [5, false, []],
      // Invalid
      ['1', true, ['a']],
      ['1', false, ['a', 'b']]
    ])('%p value (firstErrorOnly: %p) should evaluate as %o', (value, firstErrorOnly, expected) => {
      expect(validator.errors(value, firstErrorOnly)).toEqual(expected)
    })
  })
})