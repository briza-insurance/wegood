import { ValidationRule } from '.';
/**
 * Pattern validation rule.
 * @param {string} errorMsg Error message.
 * @param {RegExp} rx Regular expression.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function pattern(errorMsg: string, rx: RegExp): ValidationRule;
export default pattern;
