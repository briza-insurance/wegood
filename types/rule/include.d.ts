import { ValidationRule } from '.';
/**
 * Include validation rule.
 * @param {string} errorMsg Error message.
 * @param {string[]|number[]} inclusions List of inclusions.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function include(errorMsg: string, inclusions: (string | number)[]): ValidationRule;
export default include;
