import { isFunction, isNullOrUndefined, isObject } from '../common/type-check'
import { ValidationRule } from '.'

/**
 * Present validation rule.
 * @param errorMsg Error message.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function present (errorMsg: string): ValidationRule {
  return (value): true | string => {
    if (isNullOrUndefined(value)) {
      return errorMsg
    }

    if (isFunction(value) || isObject(value)) {
      throw new Error(`present validation rule cannot validate "${value}"`)
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? true : errorMsg
    }

    if ((value + '').trim() === '') {
      return errorMsg
    }

    return true
  }
}

export default present
