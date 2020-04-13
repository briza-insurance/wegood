import { ValidationRule } from '.';
/**
 * Pattern validation rule.
 * @param errorMsg Error message.
 * @param pattern Regular expression.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function pattern(errorMsg: string, pattern: RegExp): ValidationRule;
export default pattern;
