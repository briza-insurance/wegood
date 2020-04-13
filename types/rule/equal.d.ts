import { ValidationRule } from '.';
declare type EqualPredicate = (value: any) => boolean;
/**
 * Equal validation rule.
 * @param errorMsg Error message.
 * @param arg Matcher object, or a custom equality
 * predicate function, fn(val) returning true|false (equal / not equal).
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function equal(errorMsg: string, arg: any | EqualPredicate): ValidationRule;
export default equal;
