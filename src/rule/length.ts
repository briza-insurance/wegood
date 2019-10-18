import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isString,
  isNumber
} from '../common/type-check'

/**
 * Length validation rule.
 * @param {string} errorMsg Error message.
 * @param {null|undefined|number} min Minimal length. If null or undefined,
 * there is no min length.
 * @param {null|undefined|number} max Maximal length. If null or undefined,
 * there is no max length.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function length (
  errorMsg: string,
  min: null|undefined|number,
  max: null|undefined|number
): ValidationRule {
  const minLength = isNumber(min)
  const maxLength = isNumber(max)

  // No boundaries
  if (!minLength && !maxLength) {
    console.warn(`the length validation rule without min and max has
      no validation effect, it will be always validated as true.`)
  }

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

    // Min
    if (minLength && value.length < (min as number)) {
      return errorMsg
    }
    // Max
    if (maxLength && value.length > (max as number)) {
      return errorMsg
    }
    return true
  }
}

export default length
