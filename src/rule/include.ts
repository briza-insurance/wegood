import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isString,
  isNumber,
  isBoolean
} from '../common/type-check'

/**
 * Include validation rule.
 * @param errorMsg Error message.
 * @param inclusions List of inclusions.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function include (errorMsg: string, inclusions: (string | number | boolean)[]): ValidationRule {
  // No inclusions
  if (inclusions.length === 0) {
    console.warn(`the include validation rule without any inclusions'
      has no validation effect, it will be always validated as false.`)
  }

  return (value): true | string => {
    if (isNullOrUndefined(value) ||
      (!isBoolean(value) && !isString(value) && !isNumber(value))) {
      return errorMsg
    }

    if (inclusions.indexOf(value) === -1) {
      return errorMsg
    }

    return true
  }
}

export default include
