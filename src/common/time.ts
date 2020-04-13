/**
 * Get today date.
 */
export function today (): Date {
  return new Date((new Date()).setHours(0, 0, 0, 0))
}
