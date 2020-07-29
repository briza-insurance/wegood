import { today } from '../common/time'
import { isDate, isNullOrUndefined, isString } from '../common/type-check'
import { ValidationRule } from '.'
import { BoundaryType } from './date'

/**
 * Create year boundary based on the boundary type.
 * @param filter Year filter.
 * @param dir Boundary direction, 0 start, 1 end.
 * @return Function accepting the relative year which should be used
 * in the comparison procedure.
 */
function yearBoundary (
  filter: string | number | null | undefined,
  dir: BoundaryType
): (year: number) => boolean {
  if (isNullOrUndefined(filter)) {
    return (): boolean => true
  }

  const isStringValue = isString(filter)

  // Boundary offset in years
  let offset: number

  // Dynamic offset
  let dynamicOffset
  if (isStringValue) {
    dynamicOffset = (filter as string).match(/^(-?[1-9]\d*)y$/)
  }
  if (dynamicOffset && dynamicOffset !== null) {
    offset = parseInt(dynamicOffset[1])

    // or -1,1 (in past, in future)
  } else if (['-1', '1'].includes(`${filter}`)) {
    offset = Infinity * parseInt(filter as string)

    // Start 1 = tomorrow
    if (dir === BoundaryType.Start && offset > 0) {
      offset = 1 // 1 year in future, dynamic offset.
    }
    // End -1 = any date in past
    if (dir === BoundaryType.End && offset < 0) {
      offset = -1 // 1 year in past, dynamic offset.
    }
    // Current year
  } else if (filter === 0) {
    offset = 0
  }

  return (year: number): boolean => {
    const currentYear = today().getFullYear()

    if (offset !== undefined) {
      return dir === BoundaryType.Start
        ? year >= (currentYear + offset)
        : year <= (currentYear + offset)
    }

    return dir === BoundaryType.Start
      ? year >= (filter as number)
      : year <= (filter as number)
  }
}

/**
 * Year validation rule.
 * @param errorMsg Error message.
 * @param start Start year boundary.
 * If null or undefined, there is no start boundary.
 * @param end End year boundary.
 * If null or undefined, there is no end boundary.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
function year (
  errorMsg: string,
  start: string | number | null | undefined,
  end: string | number | null | undefined
): ValidationRule {
  // No boundaries
  if (isNullOrUndefined(start) && isNullOrUndefined(end)) {
    console.warn('the year validation rule without start and end has ' +
      'no validation effect, it will be always validated as true.')
    return (): true => true
  }

  const startBoundary = yearBoundary(start, BoundaryType.Start)
  const endBoundary = yearBoundary(end, BoundaryType.End)

  return (value): true | string => {
    if (isNullOrUndefined(value)) {
      return errorMsg
    }

    // Get the year
    if (isDate(value)) {
      value = value.getFullYear()
    } else {
      value = parseInt(value, 10)
    }
    if (value < 0) {
      console.warn(`the year validation rule, invalid "${value}" year value`)
      return errorMsg
    }

    // Check the value boundaries
    if (startBoundary(value) === false || endBoundary(value) === false) {
      return errorMsg
    }

    return true
  }
}

export default year
