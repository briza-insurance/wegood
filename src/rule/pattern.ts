import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isString,
  isNumber
} from '../common/type-check'

/**
 * Pattern validation rule.
 * @param {string} errorMsg Error message.
 * @param {RegExp} rx Regular expression.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function pattern (errorMsg: string, rx: RegExp): ValidationRule {
  return (value): true|string => {
    if (isNullOrUndefined(value)) {
      return errorMsg
    }

    const isValueString = isString(value)

    // Cast to string
    if (isValueString === false && isNumber(value)) {
      value = '' + value
    } else if (isValueString === false) {
      return errorMsg
    }

    if (value.match(rx) === null) {
      return errorMsg
    }

    return true
  }
}

export default pattern
