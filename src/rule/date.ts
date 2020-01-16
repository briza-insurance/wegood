import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isDate,
  isString,
  isNumber
} from '../common/type-check'

// Boundary type used to determine if the date boundary should be before
// or after the specific date.
enum BoundaryType {
  Start = 0,
  End,
}

/**
* Get today date.
*/
export function getToday (): Date {
  return new Date((new Date()).setHours(0, 0, 0, 0))
}

/**
 * Expose mock-able rule members.
 */
export const exported = {
  getToday
}

/**
* Get the day offset from the matched Rx pattern.
*
* **Nd** = N days offset, e.g. 2d
*
* **-Nd** = -N days offset, e.g. -2d
*
* **Nw** = N weeks offset, e.g. 1w
*
* **-Nw** = -N weeks offset, e.g. -1w
*
* **Nm** = N months offset, e.g. 3m
*
* **-Nm** = -N months offset, e.g. -3m
*
* **Ny** = N years offset, e.g. 5y
*
* **-Ny** = -N years offset, e.g. -5y
*
* @param {string[]} match Regular expression match array.
* @return {number} Offset in days.
*/
function dateOffset (match: RegExpMatchArray): number {
  const amount = parseInt(match[1])
  const unit = match[2]
  switch (unit) {
    case 'd':
      return amount
    case 'w':
      return amount * 7
    case 'm':
      return amount * 31
    case 'y':
    default:
      return amount * 365
  }
}

/**
 * Create a date boundary based on the boundary type.
 * @param {string|number|null|undefined} filter Date filter.
 * @param {number} dir Boundary direction, 0 start, 1 end.
 * @return {function} Function accepting the relative
 * date which should be used in the comparison procedure.
 */
function dateBoundary (
  filter: Date|string|number|null|undefined,
  dir: BoundaryType
): (date: Date) => boolean {
  if (isNullOrUndefined(filter)) {
    return (): boolean => true
  }

  // Boundary offset in days
  let offset = 0

  // Direct date boundary
  let isDateFilter = isDate(filter)

  // Convert number symbols to string
  if (!isDateFilter && isNumber(filter)) {
    filter = '' + filter
  }

  // ISO date string or offsets
  if (isDateFilter === false) {
    // Parse ISO date string if provided
    if ((filter as string).match(/^\d{4}-[0,1]\d-[0-3]\d$/)) {
      isDateFilter = true
      filter = new Date(`${filter}T00:00:00+0000`)
      if (isNaN(filter.getTime())) {
        throw new Error(`invalid "${filter}" ISO date string`)
      }
    }

    // Offset
    if (isDateFilter === false) {
      // Dynamic offset
      const dynamicOffset = (filter as string).match(/^(-?[1-9]\d*)([dwmy])$/)
      if (dynamicOffset !== null) {
        offset = dateOffset(dynamicOffset)

        // or -1,0,1 (in past, today, in future)
      } else if (['-1', '1'].includes(filter as string)) {
        offset = Infinity * parseInt(filter as string)
        // Flip of the offset for flipped boundaries
        if ((dir === BoundaryType.Start && offset > 0) ||
          (dir === BoundaryType.End && offset < 0)
        ) {
          offset *= -1
        }

        // Illegal offset
      } else if (filter !== '0') {
        throw new Error(`illegal "${filter}" date boundary`)
      }
    }
  }
  return (date: Date): boolean => {
    // Concrete date boundary
    if (isDateFilter) {
      if (dir === BoundaryType.Start) {
        return date.getTime() >= (filter as Date).getTime()
      }
      return date.getTime() <= (filter as Date).getTime()
    }

    // Offset
    const today = exported.getToday()
    if (dir === BoundaryType.Start) {
      return date.getTime() >= today.getTime() + (offset * 86400000)
    }
    return date.getTime() <= today.getTime() + (offset * 86400000)
  }
}

/**
 * Date validation rule.
 * The value passed into the validation function must be a Date object
 * or ISO date string: yyyy-mm-dd. Or a custom transform function can
 * be used to perform custom string to date conversion.
 * @param {string} errorMsg Error message.
 * @param {Date|string|number|null|undefined} start Start date boundary.
 * If null or undefined, there is no start boundary.
 * @param {Date|string|number|null|undefined} end End date boundary.
 * If null or undefined, there is no end boundary.
 * @param {function} transform Optional custom transform function, to
 * convert the testing value into date object.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function date (
  errorMsg: string,
  start: Date|string|number|null|undefined,
  end: Date|string|number|null|undefined,
  transform?: (value: string) => Date
): ValidationRule {
  const startBoundary = dateBoundary(start, BoundaryType.Start)
  const endBoundary = dateBoundary(end, BoundaryType.End)

  // No boundaries
  if (isNullOrUndefined(start) && isNullOrUndefined(end)) {
    console.warn(`the date validation rule without start and end has
      no validation effect, it will be always validated as true.`)
    return (): true => true
  }

  return (value): true|string => {
    if (isNullOrUndefined(value)) {
      return errorMsg
    }

    // String to date
    const isDateValue = isDate(value)
    const isStringValue = isString(value)
    if (isDateValue === false && isStringValue) {
      // Custom transform
      if (transform !== undefined) {
        value = transform(value)

        // ISO format
      } else if (value.match(/^\d{4}-[0,1]\d-[0-3]\d$/)) {
        value = new Date(`${value}T00:00:00+0000`)

        // Invalid
      } else {
        console.warn(`the date validation rule, invalid "${value}" date value`)
        return errorMsg
      }
    } else if (isDateValue === false && isStringValue === false) {
      return errorMsg
    }

    // Invalid date
    if (isNaN(value.getTime())) {
      throw new Error(`invalid "${value}" ISO date string`)
    }

    // Check the value boundaries
    if (startBoundary(value) === false || endBoundary(value) === false) {
      return errorMsg
    }

    return true
  }
}

export default date
