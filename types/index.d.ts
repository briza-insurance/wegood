import { ValidationRule } from './rule';
import date from './rule/date';
import equal from './rule/equal';
import exclude from './rule/exclude';
import include from './rule/include';
import length from './rule/length';
import pattern from './rule/pattern';
import range from './rule/range';
import present from './rule/present';
/**
 * Built-in validation rules
 */
export { present, date, equal, exclude, include, length, pattern, range };
/**
 * Validation result.
 */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
/**
 * Validator
 *
 * Aggregated validation of given validation rules against the tested value.
 */
export declare class Validator {
    private readonly _rules;
    /**
     * @constructor
     * @param {ValidationRule[]} rules Validation rules.
     * FIFO order, i.e. the rules will be tested from top to bottom.
     */
    constructor(rules: ValidationRule[]);
    /**
     * Get the validator rules.
     * @return {ValidationRule[]}
     */
    readonly rules: ValidationRule[];
    /**
     * Validate against the value.
     * If all rules are satisfied, the return value is true.
     * Otherwise the return value is an error message of the failed rule.
     * @param {mixed} value Validated value.
     * @param {boolean} firstErrorOnly Return only first error.
     * Defaults to true.
     * If set to false, it returns an array of errors, if any.
     * @return {ValidationResult}
     */
    validate(value: any, firstErrorOnly?: boolean): ValidationResult;
    /**
     * Validity predicate against the value.
     * @param {mixed} value Validated value.
     * @return {boolean}
     */
    valid(value: any): boolean;
    /**
     * Get all validation errors, if any.
     * Otherwise it returns empty array.
     * @param {mixed} value Validated value.
     * @param {boolean} firstErrorOnly Return only first error.
     * Defaults to false.
     * @return {string[]}
     */
    errors(value: any, firstErrorOnly?: boolean): string[];
}
export default Validator;
