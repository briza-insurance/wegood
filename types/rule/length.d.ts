import { ValidationRule } from '.';
/**
 * Length validation rule.
 * @param {string} errorMsg Error message.
 * @param {null|undefined|number} min Minimal length. If null or undefined,
 * there is no min length.
 * @param {null|undefined|number} max Maximal length. If null or undefined,
 * there is no max length.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function length(errorMsg: string, min: null | undefined | number, max: null | undefined | number): ValidationRule;
export default length;
