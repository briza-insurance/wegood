import { ValidationRule } from '.';
/**
 * Range validation rule.
 * @param {string} errorMsg Error message.
 * @param {null|undefined|number} min Minimal boundary. If null or undefined,
 * there is no min boundary.
 * @param {null|undefined|number} max Maximal boundary. If null or undefined,
 * there is no max boundary.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function range(errorMsg: string, min: null | undefined | number, max: null | undefined | number): ValidationRule;
export default range;
