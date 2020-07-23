import { ValidationRule } from './rule';
import date from './rule/date';
import year from './rule/year';
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
export { present, date, year, equal, exclude, include, length, pattern, range };
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
     * @param rules Validation rules.
     * FIFO order, i.e. the rules will be tested from top to bottom.
     */
    constructor(rules: ValidationRule[]);
    /**
     * Get the validator rules.
     * @return
     */
    get rules(): ValidationRule[];
    /**
     * Validate against the value.
     * If all rules are satisfied, the return value is true.
     * Otherwise the return value is an error message of the failed rule.
     * @param value Validated value.
     * @param firstErrorOnly Return only first error.
     * Defaults to true.
     * If set to false, it returns an array of errors, if any.
     * @return
     */
    validate(value: unknown, firstErrorOnly?: boolean): ValidationResult;
    /**
     * Validity predicate against the value.
     * @param value Validated value.
     * @return
     */
    valid(value: unknown): boolean;
    /**
     * Get all validation errors, if any.
     * Otherwise it returns empty array.
     * @param value Validated value.
     * @param firstErrorOnly Return only first error.
     * Defaults to false.
     * @return
     */
    errors(value: unknown, firstErrorOnly?: boolean): string[];
}
export default Validator;
