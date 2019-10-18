import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isString,
  isNumber
} from '../common/type-check'

/**
 * Exclude validation rule.
 * @param {string} errorMsg Error message.
 * @param {string[]|number[]} exclusions List of exclusions.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function exclude (errorMsg: string, exclusions: (string|number)[]): ValidationRule {
  // No exclusions
  if (exclusions.length === 0) {
    console.warn(`the exclude validation rule without any exclusions
      has no validation effect, it will be always validated as true.`)
  }

  return (value): true|string => {
    if (isNullOrUndefined(value) ||
    (isString(value) === false && isNumber(value) === false)) {
      return errorMsg
    }

    if (exclusions.indexOf(value) > -1) {
      return errorMsg
    }

    return true
  }
}

export default exclude
