import Validator from '../../'
import equal from '../../rule/equal'

describe('Validator', () => {
  test('constructor', () => {
    let exceptions = [
      {rules: []},
      {rules: [5]},
      {rules: [{}]},
      {rules: ['rule']},
    ]
  
    for (const exception of exceptions) {
      // @ts-ignore
      expect(() => new Validator(exception.rules)).toThrowError()
    }
  })

  test('rules', () => {
    const rule = equal('invalid', 5)
    expect(new Validator([rule]).rules[0]).toBe(rule)
  })

  describe('validate - first error only', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])
    const tests = [
      // Valid
      {value: 5, expected: true},
      // Invalid
      {value: '1', expected: 'a'},
    ]

    for (const t of tests) {
      test(`Value: ${t.value}`, () => {
        expect(validator.validate(t.value)).toBe(t.expected)
      })
    }
  })

  describe('validate - all errors', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])
    const tests = [
      // Valid
      {value: 5, expected: true},
      // Invalid
      {value: '1', expected: ['a', 'b']},
    ]

    for (const t of tests) {
      test(`Value: ${t.value}`, () => {
        expect(validator.validate(t.value, false)).toEqual(t.expected)
      })
    }
  })

  describe('valid', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])
    const tests = [
      // Valid
      {value: 5, expected: true},
      // Invalid
      {value: '1', expected: false},
    ]

    for (const t of tests) {
      test(`Value: ${t.value}`, () => {
        expect(validator.valid(t.value)).toBe(t.expected)
      })
    }
  })

  describe('error', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])
    const tests = [
      // Valid
      {value: 5, expected: null},
      // Invalid
      {value: '1', expected: 'a'},
    ]

    for (const t of tests) {
      test(`Value: ${t.value}`, () => {
        expect(validator.error(t.value)).toBe(t.expected)
      })
    }
  })

  describe('errors', () => {
    const validator = new Validator([
      equal('a', 5),
      equal('b', 5)
    ])
    const tests = [
      // Valid
      {value: 5, expected: null},
      // Invalid
      {value: '1', expected: ['a', 'b']},
    ]

    for (const t of tests) {
      test(`Value: ${t.value}`, () => {
        expect(validator.errors(t.value)).toEqual(t.expected)
      })
    }
  })
})