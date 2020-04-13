/**
 * Validation Rule
 * - Returned true, represent that the rule is satisfied, i.e. valid.
 * - Returned string, represent the validation error message.
 */
export type ValidationRule = (value: any) => true | string
