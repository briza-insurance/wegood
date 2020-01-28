import { ValidationRule } from '.';
/**
 * Exclude validation rule.
 * @param {string} errorMsg Error message.
 * @param {string[]|number[]} exclusions List of exclusions.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function exclude(errorMsg: string, exclusions: (string | number)[]): ValidationRule;
export default exclude;
