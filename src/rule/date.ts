import { ValidationRule } from '.'
import {
  isNullOrUndefined,
  isDate,
  isString,
  isNumber
} from '../common/type-check'
import { today } from '../common/time'

// Boundary type used to determine if the date boundary should be before
// or after the specific date.
export enum BoundaryType {
  Start = 0,
  End,
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
* @param match Regular expression match array.
* @return Offset in days.
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
 * @param filter Date filter.
 * @param dir Boundary direction, 0 start, 1 end.
 * @return Function accepting the relative
 * date which should be used in the comparison procedure.
 */
function dateBoundary (
  filter: Date | string | number | null | undefined,
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
      filter = new Date(`${filter}T00:00:00`)
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
      } else if (['-1', '1'].includes(`${filter}`)) {
        offset = Infinity * parseInt(filter as string)

        // Start 1 = tomorrow
        if (dir === BoundaryType.Start && offset > 0) {
          offset = 1 // 1 day in future, dynamic offset.
        }
        // End -1 = any date in past
        if (dir === BoundaryType.End && offset < 0) {
          offset = -1 // 1 day in past, dynamic offset.
        }

        // Illegal offset
      } else if (`${filter}` !== '0') {
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
    const todayDate = today()
    if (dir === BoundaryType.Start) {
      return date.getTime() >= todayDate.getTime() + (offset * 86400000)
    }
    return date.getTime() <= todayDate.getTime() + (offset * 86400000)
  }
}

/**
 * Get local timezone offset as ISO string
 * E.g. '-05:00'
 * @return ISO timezone offset string
 */
export function getISOTimezoneOffset (): string {
  function pad (value: number): string | number {
    return value < 10 ? '0' + value : value
  }

  const date = new Date()
  const sign = (date.getTimezoneOffset() > 0) ? '-' : '+'
  const offset = Math.abs(date.getTimezoneOffset())
  const hours = pad(Math.floor(offset / 60))
  const minutes = pad(offset % 60)
  return sign + hours + ':' + minutes
}

/**
 * Date validation rule.
 * The value passed into the validation function must be a Date object
 * or ISO date string: yyyy-mm-dd. Or a custom transform function can
 * be used to perform custom string to date conversion.
 * @param errorMsg Error message.
 * @param start Start date boundary.
 * If null or undefined, there is no start boundary.
 * @param end End date boundary.
 * If null or undefined, there is no end boundary.
 * @param transform Optional custom transform function, to
 * convert the testing value into date object.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function date (
  errorMsg: string,
  start: Date | string | number | null | undefined,
  end: Date | string | number | null | undefined,
  transform?: (value: string) => Date
): ValidationRule {
  // No boundaries
  if (isNullOrUndefined(start) && isNullOrUndefined(end)) {
    console.warn(`the date validation rule without start and end has
      no validation effect, it will be always validated as true.`)
    return (): true => true
  }

  const startBoundary = dateBoundary(start, BoundaryType.Start)
  const endBoundary = dateBoundary(end, BoundaryType.End)

  return (value): true | string => {
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
        value = new Date(`${value}T00:00:00${getISOTimezoneOffset()}`)

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
