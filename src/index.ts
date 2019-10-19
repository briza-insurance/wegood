import { ValidationRule } from './rule'
import { isFunction } from './common/type-check'

import date from './rule/date'
import equal from './rule/equal'
import exclude from './rule/exclude'
import include from './rule/include'
import length from './rule/length'
import pattern from './rule/pattern'
import range from './rule/range'
import present from './rule/present'

/**
 * Built-in validation rules
 */
export {
  present,
  date,
  equal,
  exclude,
  include,
  length,
  pattern,
  range
}

/**
 * Validator
 *
 * Aggregated validation of given validation rules against the tested value.
 */
export class Validator {
  private readonly _rules: ValidationRule[]

  /**
   * @constructor
   * @param {ValidationRule[]} rules Validation rules.
   * FIFO order, i.e. the rules will be tested from top to bottom.
   */
  constructor (rules: ValidationRule[]) {
    if (rules.length === 0) {
      throw new Error('the validator must have validation rules')
    }
    for (const rule of rules) {
      if (isFunction(rule) === false) {
        throw new Error(`invalid validation rule, ${rule}`)
      }
    }
    this._rules = rules
  }

  /**
   * Get the validator rules.
   * @return {ValidationRule[]}
   */
  get rules (): ValidationRule[] {
    return this._rules
  }

  /**
   * Validate against the value.
   * If all rules are satisfied, the return value is true.
   * Otherwise the return value is an error message of the failed rule.
   * @param {mixed} value Validated value.
   * @param {boolean} firstErrorOnly Return only first error.
   * Defaults to true.
   * If set to false, it returns an array of errors, if any.
   * @return {true|string|string[]}
   */
  validate (value: any, firstErrorOnly = true): true|string|string[] {
    const errors = []
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        if (firstErrorOnly) {
          return result
        } else {
          errors.push(result)
        }
      }
    }
    return errors.length > 0 ? errors : true
  }

  /**
   * Validity predicate against the value.
   * @param {mixed} value Validated value.
   * @return {boolean}
   */
  valid (value: any): boolean {
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        return false
      }
    }
    return true
  }

  /**
   * Get the first validation error, if any.
   * Otherwise it returns null.
   * @param {mixed} value Validated value.
   * @return {string|null}
   */
  error (value: any): string|null {
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        return result
      }
    }
    return null
  }

  /**
   * Get all validation errors, if any.
   * Otherwise it returns null.
   * @param {mixed} value Validated value.
   * @return {string[]|null}
   */
  errors (value: any): string[]|null {
    const errors = []
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        errors.push(result)
      }
    }
    return errors.length > 0 ? errors : null
  }
}

export default Validator
