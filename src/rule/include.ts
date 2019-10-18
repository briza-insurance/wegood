import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isString,
  isNumber
} from '../common/type-check'

/**
 * Include validation rule.
 * @param {string} errorMsg Error message.
 * @param {string[]|number[]} inclusions List of inclusions.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function include (errorMsg: string, inclusions: (string|number)[]): ValidationRule {
  // No inclusions
  if (inclusions.length === 0) {
    console.warn(`the include validation rule without any inclusions
      has no validation effect, it will be always validated as false.`)
  }

  return (value): true|string => {
    if (isNullOrUndefined(value) ||
    (isString(value) === false && isNumber(value) === false)) {
      return errorMsg
    }

    if (inclusions.indexOf(value) === -1) {
      return errorMsg
    }

    return true
  }
}

export default include
