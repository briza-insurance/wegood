/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Is Null or Undefined predicate.
 * @param value Rested value.
 * @return
 */
export function isNullOrUndefined (value: any): boolean {
  return typeof value === 'undefined' || value === null
}

/**
 * Is number predicate.
 * @param value Tested value.
 * @return
 */
export function isNumber (value: any): value is number {
  return typeof value === 'number' && isFinite(value)
}

/**
 * Is string type predicate.
 * @param value
 * @return
 */
export function isString (value: any): value is string {
  return typeof value === 'string' || value instanceof String
}

/**
 * Is function type predicate.
 * @param value
 * @return
 */
export function isFunction (value: any): boolean {
  return typeof value === 'function'
}

/**
 * Is date type predicate.
 * @param value
 * @return
 */
export function isDate (value: any): value is Date {
  return value instanceof Date
}

/**
 * Is Object
 * @param value tested value
 * @return result of the test
 */
export function isObject (value: any): boolean {
  return typeof value === 'object' && value.constructor === Object
}
