import { isNullOrUndefined, isNumber, isString } from '../common/type-check'
import { ValidationRule } from '.'

/**
 * Pattern validation rule.
 * @param errorMsg Error message.
 * @param pattern Regular expression.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function pattern (errorMsg: string, pattern: RegExp): ValidationRule {
  return (value): true | string => {
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

    if (value.match(pattern) === null) {
      return errorMsg
    }

    return true
  }
}

export default pattern
