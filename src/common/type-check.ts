/**
 * Is Null or Undefined predicate.
 * @param {mixed} value Rested value.
 * @return {boolean}
 */
export function isNullOrUndefined (value: any): boolean {
  return typeof value === 'undefined' || value === null
}

/**
 * Is number predicate.
 * @param {mixed} value Tested value.
 * @return {boolean}
 */
export function isNumber (value: any): boolean {
  return typeof value === 'number' && isFinite(value)
}

/**
 * Is string type predicate.
 * @param {mixed} value
 * @return {boolean}
 */
export function isString (value: any): boolean {
  return typeof value === 'string' || value instanceof String
}

/**
 * Is function type predicate.
 * @param {mixed} value
 * @return {boolean}
 */
export function isFunction (value: any): boolean {
  return typeof value === 'function'
}

/**
 * Is date type predicate.
 * @param {mixed} value
 * @return {boolean}
 */
export function isDate (value: any): boolean {
  return value instanceof Date
}

/**
 * Is Object
 * @param {mixed} value tested value
 * @return {boolean} result of the test
 */
export function isObject (value: any): boolean {
  return typeof value === 'object' && value.constructor === Object
}
