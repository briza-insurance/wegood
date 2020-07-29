import { isFunction } from './common/type-check'
import { ValidationRule } from './rule'
import date from './rule/date'
import equal from './rule/equal'
import exclude from './rule/exclude'
import include from './rule/include'
import length from './rule/length'
import pattern from './rule/pattern'
import present from './rule/present'
import range from './rule/range'
import year from './rule/year'

/**
 * Built-in validation rules
 */
export {
  present,
  date,
  year,
  equal,
  exclude,
  include,
  length,
  pattern,
  range
}

/**
 * Validation result.
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
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
   * @param rules Validation rules.
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
   * @return
   */
  get rules (): ValidationRule[] {
    return this._rules
  }

  /**
   * Validate against the value.
   * If all rules are satisfied, the return value is true.
   * Otherwise the return value is an error message of the failed rule.
   * @param value Validated value.
   * @param firstErrorOnly Return only first error.
   * Defaults to true.
   * If set to false, it returns an array of errors, if any.
   * @return
   */
  validate (value: unknown, firstErrorOnly = true): ValidationResult {
    const res: ValidationResult = {
      valid: true,
      errors: []
    }
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        res.valid = false
        res.errors.push(result)
        if (firstErrorOnly) {
          break
        }
      }
    }
    return res
  }

  /**
   * Validity predicate against the value.
   * @param value Validated value.
   * @return
   */
  valid (value: unknown): boolean {
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        return false
      }
    }
    return true
  }

  /**
   * Get all validation errors, if any.
   * Otherwise it returns empty array.
   * @param value Validated value.
   * @param firstErrorOnly Return only first error.
   * Defaults to false.
   * @return
   */
  errors (value: unknown, firstErrorOnly = false): string[] {
    const errors = []
    for (const rule of this._rules) {
      const result = rule(value)
      if (result !== true) {
        errors.push(result)
        if (firstErrorOnly) {
          break
        }
      }
    }
    return errors
  }
}

export default Validator
