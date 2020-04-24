import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isString,
  isNumber,
  isBoolean
} from '../common/type-check'

/**
 * Exclude validation rule.
 * @param errorMsg Error message.
 * @param exclusions List of exclusions.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function exclude (errorMsg: string, exclusions: (string | number | boolean)[]): ValidationRule {
  // No exclusions
  if (exclusions.length === 0) {
    console.warn(`the exclude validation rule without any exclusions
      has no validation effect, it will be always validated as true.`)
  }

  return (value): true | string => {
    if (isNullOrUndefined(value) ||
      (!isBoolean(value) && !isString(value) && !isNumber(value))) {
      return errorMsg
    }

    if (exclusions.indexOf(value) > -1) {
      return errorMsg
    }

    return true
  }
}

export default exclude
