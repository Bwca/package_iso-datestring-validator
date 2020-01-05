/**
 *
 * @param time hh:mm:ss (optional)
 * @param s separator between hours, minutes and optional seconds
 */
export function isValidTime(time: string, s = ':'): boolean {
  const validator = new RegExp(
    `^([0-1]|2(?=([0-3])|4${s}00))[0-9]${s}[0-5][0-9](${s}([0-5]|6(?=0))[0-9])?(\.[0-9]{1,9})?$`,
  );
  return validator.test(time);
}
