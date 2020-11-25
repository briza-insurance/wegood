import { ValidationRule } from '.';
/**
 * Include validation rule.
 * @param errorMsg Error message.
 * @param inclusions List of inclusions.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function include(errorMsg: string, inclusions: (string | number | boolean)[]): ValidationRule;
export default include;
