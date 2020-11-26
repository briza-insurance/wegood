import { ValidationRule } from '.';
/**
 * Year validation rule.
 * @param errorMsg Error message.
 * @param start Start year boundary.
 * If null or undefined, there is no start boundary.
 * @param end End year boundary.
 * If null or undefined, there is no end boundary.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function year(errorMsg: string, start: string | number | null | undefined, end: string | number | null | undefined): ValidationRule;
export default year;
