import { isValidZoneOffset } from '../is-valid-timezone-offset/is-valid-timezone-offset.function';
import { getStringSeparator } from '../utils/get-string-separator.function';

/**
 *
 * @param timeWithOffset hh:mm:ss (optional)
 * @param s separator between hours, minutes and optional seconds
 */
export function isValidTime(timeWithOffset: string, s = ':'): boolean {

  const validator = new RegExp(
    `^([0-1]|2(?=([0-3])|4${s}00))[0-9]${s}[0-5][0-9](${s}([0-5]|6(?=0))[0-9])?(\.[0-9]{1,9})?$`,
  );

  if (!/[Z+\-]/.test(timeWithOffset)) {
    return validator.test(timeWithOffset);
  }

  /** Case we got time in Zulu tz */
  if (/Z$/.test(timeWithOffset)) {
    return validator.test(timeWithOffset.replace('Z', ''));
  }

  const isPositiveTimezoneOffset = timeWithOffset.includes('+');
  const [time, offset] = timeWithOffset.split(/[+-]/);

  return validator.test(time) && isValidZoneOffset(offset, isPositiveTimezoneOffset, getStringSeparator(offset));

}
