/**
 * Is Null or Undefined predicate.
 * @param value Rested value.
 * @return
 */
export declare function isNullOrUndefined(value: unknown): boolean;
/**
 * Is number predicate.
 * @param value Tested value.
 * @return
 */
export declare function isNumber(value: unknown): value is number;
/**
 * Is string type predicate.
 * @param value
 * @return
 */
export declare function isString(value: unknown): value is string;
/**
 * Is boolean type predicate.
 * @param value
 * @return
 */
export declare function isBoolean(value: unknown): value is boolean;
/**
 * Is function type predicate.
 * @param value
 * @return
 */
export declare function isFunction(value: unknown): boolean;
/**
 * Is date type predicate.
 * @param value
 * @return
 */
export declare function isDate(value: unknown): value is Date;
/**
 * Is Object
 * @param value tested value
 * @return result of the test
 */
export declare function isObject(value: unknown): boolean;
