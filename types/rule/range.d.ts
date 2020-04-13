import { ValidationRule } from '.';
/**
 * Range validation rule.
 * @param errorMsg Error message.
 * @param min Minimal boundary. If null or undefined,
 * there is no min boundary.
 * @param max Maximal boundary. If null or undefined,
 * there is no max boundary.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function range(errorMsg: string, min: null | undefined | number, max: null | undefined | number): ValidationRule;
export default range;
