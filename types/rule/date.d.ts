import { ValidationRule } from '.';
/**
* Get today date.
*/
export declare function getToday(): Date;
/**
 * Expose mock-able rule members.
 */
export declare const exported: {
    getToday: typeof getToday;
};
/**
 * Date validation rule.
 * The value passed into the validation function must be a Date object
 * or ISO date string: yyyy-mm-dd. Or a custom transform function can
 * be used to perform custom string to date conversion.
 * @param {string} errorMsg Error message.
 * @param {Date|string|number|null|undefined} start Start date boundary.
 * If null or undefined, there is no start boundary.
 * @param {Date|string|number|null|undefined} end End date boundary.
 * If null or undefined, there is no end boundary.
 * @param {function} transform Optional custom transform function, to
 * convert the testing value into date object.
 * @return {ValidationRule} validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function date(errorMsg: string, start: Date | string | number | null | undefined, end: Date | string | number | null | undefined, transform?: (value: string) => Date): ValidationRule;
export default date;
