import { isValidDate } from '../is-valid-date/is-valid-date.function';
import { isValidTime } from '../is-valid-time/is-valid-time.function';
import { isValidZoneOffset } from '../is-valid-timezone-offset/is-valid-timezone-offset.function';
import { getStringSeparator } from '../utils/get-string-separator.function';

export function isValidISODateString(dateString: string): boolean {
  const [date, timeWithOffset] = dateString.split('T');
  const dateSeparator = getStringSeparator(date);
  const isDateValid = isValidDate(date, dateSeparator);

  if (/Z$/.test(timeWithOffset)) {
    const timeWithoutZone = timeWithOffset.replace('Z', '');
    return (
      isDateValid &&
      isValidTime(timeWithoutZone, getStringSeparator(timeWithoutZone))
    );
  }

  const isPositiveTimezoneOffset = timeWithOffset.includes('+');
  const [time, offset] = timeWithOffset.split(/[+-]/);
  return (
    isDateValid &&
    isValidTime(time, getStringSeparator(time)) &&
    isValidZoneOffset(offset, isPositiveTimezoneOffset, getStringSeparator(offset))
  );
}
