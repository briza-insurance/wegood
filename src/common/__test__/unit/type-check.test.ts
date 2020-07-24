import {
  isNullOrUndefined,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isDate,
  isObject
} from '../../type-check'

describe('Common - Type Check', () => {
  describe('isNullOrUndefined', () => {
    test.each([
      // Truthy
      [undefined, true],
      [null, true],
      // Falsy
      [1, false],
      ['1', false],
      [true, false],
      [false, false],
      [{}, false],
      [() => { }, false]
    ])('%p should evaluate as %p', (value, expected) => {
      // @ts-ignore
      expect(isNullOrUndefined(value)).toBe(expected)
    })
  })
  describe('isNumber', () => {
    test.each([
      // Truthy
      [1, true],
      [1.0, true],
      // Falsy
      [Infinity, false],
      [-Infinity, false],
      ['1', false],
      [true, false],
      [false, false],
      [{}, false],
      [() => { }, false]
    ])('%p should evaluate as %p', (value, expected) => {
      // @ts-ignore
      expect(isNumber(value)).toBe(expected)
    })
  })

  describe('isString', () => {
    test.each([
      // Truthy
      ['1', true],
      [new String('1'), true],
      // Falsy
      [1, false],
      [true, false],
      [false, false],
      [{}, false],
      [() => { }, false]
    ])('%p should evaluate as %p', (value, expected) => {
      // @ts-ignore
      expect(isString(value)).toBe(expected)
    })
  })

  describe('isBoolean', () => {
    test.each([
      // Truthy
      [true, true],
      [false, true],
      // Falsy
      [1, false],
      ['1', false],
      [{}, false],
      [() => { }, false]
    ])('%p should evaluate as %p', (value, expected) => {
      // @ts-ignore
      expect(isBoolean(value)).toBe(expected)
    })
  })

  describe('isFunction', () => {
    test.each([
      // Truthy
      [() => { }, true],
      // Falsy
      [1, false],
      ['1', false],
      [{}, false],
      [true, false],
      [false, false]
    ])('%p should evaluate as %p', (value, expected) => {
      // @ts-ignore
      expect(isFunction(value)).toBe(expected)
    })
  })

  describe('isDate', () => {
    test.each([
      // Truthy
      [new Date(), true],
      // Falsy
      [1, false],
      ['1', false],
      [{}, false],
      [true, false],
      [false, false],
      [() => { }, false],
    ])('%p should evaluate as %p', (value, expected) => {
      // @ts-ignore
      expect(isDate(value)).toBe(expected)
    })
  })

  describe('isObject', () => {
    test.each([
      // Truthy
      [{}, true],
      // Falsy
      ['hi', false],
      [1, false],
      [null, false],
      [undefined, false]
    ])('%p should evaluate as %p', (value, expected) => {
      expect(isObject(value)).toBe(expected)
    })
  })
})