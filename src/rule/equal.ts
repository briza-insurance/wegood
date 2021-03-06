import { isFunction, isNullOrUndefined } from '../common/type-check'
import { ValidationRule } from '.'

// Custom equality predicate function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualPredicate = (value: any) => boolean

/**
 * Equal validation rule.
 * @param errorMsg Error message.
 * @param arg Matcher object, or a custom equality
 * predicate function, fn(val) returning true|false (equal / not equal).
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function equal (
  errorMsg: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arg: any | EqualPredicate
): ValidationRule {
  const customEqualPredicate = isFunction(arg)
  return (value): true | string => {
    if (customEqualPredicate === false && isNullOrUndefined(value)) {
      return errorMsg
    }
    if (customEqualPredicate) {
      if ((arg as EqualPredicate)(value) === false) {
        return errorMsg
      }
    } else if (value !== arg) {
      return errorMsg
    }
    return true
  }
}

export default equal
