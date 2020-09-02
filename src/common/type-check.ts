/**
 * Is Null or Undefined predicate.
 * @param value Rested value.
 */
export function isNullOrUndefined (value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null
}

/**
 * Is number predicate.
 * @param value Tested value.
 */
export function isNumber (value: unknown): value is number {
  return typeof value === 'number' && isFinite(value)
}

/**
 * Is string type predicate.
 * @param value
 */
export function isString (value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

/**
 * Is boolean type predicate.
 * @param value
 */
export function isBoolean (value: unknown): value is boolean {
  return value === false || value === true
}

/**
 * Is function type predicate.
 * @param value
 * @return
 */
export function isFunction (value: unknown): value is Function { // eslint-disable-line @typescript-eslint/ban-types
  return typeof value === 'function'
}

/**
 * Is date type predicate.
 * @param value
 */
export function isDate (value: unknown): value is Date {
  return value instanceof Date
}

/**
 * Is Object
 * @param value tested value
 */
export function isObject (value: unknown): value is Record<string, unknown> {
  if (value === null || value === undefined) {
    return false
  }
  if (typeof value !== 'object' || value?.constructor !== Object) {
    return false
  }
  return true
}
