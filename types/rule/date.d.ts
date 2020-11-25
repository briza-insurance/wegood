import { ValidationRule } from '.';
export declare enum BoundaryType {
    Start = 0,
    End = 1
}
/**
 * Get local timezone offset as ISO string
 * E.g. '-05:00'
 * @return ISO timezone offset string
 */
export declare function getISOTimezoneOffset(): string;
/**
 * Date validation rule.
 * The value passed into the validation function must be a Date object
 * or ISO date string: yyyy-mm-dd. Or a custom transform function can
 * be used to perform custom string to date conversion.
 * @param errorMsg Error message.
 * @param start Start date boundary.
 * If null or undefined, there is no start boundary.
 * @param end End date boundary.
 * If null or undefined, there is no end boundary.
 * @param transform Optional custom transform function, to
 * convert the testing value into date object.
 * @param todayDate Optional Today's date to be used as reference
 * validating ranges. If not provided, the start of the day in
 * the current runtime timezone will be used.
 * @return validation function, fn(value) => true|string,
 * returns true when valid, error message otherwise.
 */
declare function date(errorMsg: string, start: Date | string | number | null | undefined, end: Date | string | number | null | undefined, transform?: (value: string) => Date, todayDate?: Date): ValidationRule;
export default date;
