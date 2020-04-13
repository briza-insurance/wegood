import { ValidationRule } from '.';
/**
 * Present validation rule.
 * @param errorMsg Error message.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function present(errorMsg: string): ValidationRule;
export default present;
