import { ValidationRule } from '.';
/**
 * Exclude validation rule.
 * @param errorMsg Error message.
 * @param exclusions List of exclusions.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function exclude(errorMsg: string, exclusions: (string | number | boolean)[]): ValidationRule;
export default exclude;
