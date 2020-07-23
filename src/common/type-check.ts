/**
 * Is Null or Undefined predicate.
 * @param value Rested value.
 * @return
 */
export function isNullOrUndefined (value: unknown): boolean {
  return typeof value === 'undefined' || value === null
}

/**
 * Is number predicate.
 * @param value Tested value.
 * @return
 */
export function isNumber (value: unknown): value is number {
  return typeof value === 'number' && isFinite(value)
}

/**
 * Is string type predicate.
 * @param value
 * @return
 */
export function isString (value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

/**
 * Is boolean type predicate.
 * @param value
 * @return
 */
export function isBoolean (value: unknown): value is boolean {
  return value === false || value === true
}

/**
 * Is function type predicate.
 * @param value
 * @return
 */
export function isFunction (value: unknown): boolean {
  return typeof value === 'function'
}

/**
 * Is date type predicate.
 * @param value
 * @return
 */
export function isDate (value: unknown): value is Date {
  return value instanceof Date
}

/**
 * Is Object
 * @param value tested value
 * @return result of the test
 */
export function isObject (value: unknown): boolean {
  return value && typeof value === 'object' && value.constructor === Object
}
