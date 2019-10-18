import { ValidationRule } from '.'
import {
  isNumber,
  isString
} from '../common/type-check'

/**
 * Range validation rule.
 * @param {string} errorMsg Error message.
 * @param {null|undefined|number} min Minimal boundary. If null or undefined,
 * there is no min boundary.
 * @param {null|undefined|number} max Maximal boundary. If null or undefined,
 * there is no max boundary.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function range (
  errorMsg: string,
  min: null|undefined|number,
  max: null|undefined|number
): ValidationRule {
  const minBoundary = isNumber(min)
  const maxBoundary = isNumber(max)

  // No boundaries
  if (!minBoundary && !maxBoundary) {
    console.warn(`the range validation rule without min and max has
      no validation effect, it will be always validated as true.`)
  }

  return (value): true|string => {
    const isValueNumber = isNumber(value)
    // if the value is not a number try to cast to number
    if (isValueNumber === false && isString(value)) {
      if (value.match(/^\d+\.\d+$/)) {
        value = parseFloat(value)
      } else if (value.match(/^0$|^[1-9]\d*$/)) {
        value = parseInt(value)
      } else {
        return errorMsg
      }
    } else if (isValueNumber === false) {
      return errorMsg
    }

    // Min
    if (minBoundary && value < (min as number)) {
      return errorMsg
    }
    // Max
    if (maxBoundary && value > (max as number)) {
      return errorMsg
    }
    return true
  }
}

export default range
