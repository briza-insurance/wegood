import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isFunction
} from '../common/type-check'

// Custom equality predicate function
type EqualPredicate = (value: any) => boolean

/**
 * Equal validation rule.
 * @param {string} errorMsg Error message.
 * @param {any|EqualPredicate} arg Matcher object, or a custom equality
 * predicate function, fn(val) returning true|false (equal / not equal).
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function equal (errorMsg: string, arg: any|EqualPredicate): ValidationRule {
  const customEqualPredicate = isFunction(arg)
  return (value): true|string => {
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
