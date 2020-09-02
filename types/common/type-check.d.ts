/**
 * Is Null or Undefined predicate.
 * @param value Rested value.
 */
export declare function isNullOrUndefined(value: unknown): value is null | undefined;
/**
 * Is number predicate.
 * @param value Tested value.
 */
export declare function isNumber(value: unknown): value is number;
/**
 * Is string type predicate.
 * @param value
 */
export declare function isString(value: unknown): value is string;
/**
 * Is boolean type predicate.
 * @param value
 */
export declare function isBoolean(value: unknown): value is boolean;
/**
 * Is function type predicate.
 * @param value
 * @return
 */
export declare function isFunction(value: unknown): value is Function;
/**
 * Is date type predicate.
 * @param value
 */
export declare function isDate(value: unknown): value is Date;
/**
 * Is Object
 * @param value tested value
 */
export declare function isObject(value: unknown): value is Record<string, unknown>;
