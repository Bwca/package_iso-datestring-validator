/**
 *
 * @param date YYYY-MM-DD
 * @param s separator symbol between years, months and days
 */
export declare function isValidDate(date: string, s?: string): boolean;
/**
 *
 * @param date YYYY-MM
 * @param s separator between hours and minutes
 */
export declare function isValidYearMonth(date: string, s?: string): boolean;
/**
 *
 * @param time hh:mm:ss (optional)
 * @param s separator between hours, minutes and optional seconds
 */
export declare function isValidTime(time: string, s?: string): boolean;
export declare function isValidISODateString(dateString: string): boolean;
/**
 *
 * @param offset
 * @param isPositiveOffset the flag, which determines if the zone has positive or negative offset
 * 00:00 is considered a positive zone
 * @param s separator
 */
export declare function isValidZoneOffset(offset: string, isPositiveOffset: boolean, s?: string): boolean;
