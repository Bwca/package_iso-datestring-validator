import { getStringSeparator } from '../get-string-separator/get-string-separator.function';
import { isValidDate } from '../is-valid-date/is-valid-date.function';
import { isValidTime } from '../is-valid-time/is-valid-time.function';

export function isValidISODateString(dateString: string, isTimeValidationOptional = false): boolean {
  const [date, timeWithOffset] = dateString.split('T');
  const dateSeparator = getStringSeparator(date);
  const isDateValid = isValidDate(date, dateSeparator);

  if (!timeWithOffset && isTimeValidationOptional) {
    return isDateValid;
  } else if (!timeWithOffset) {
    return false;
  }

  return isDateValid && isValidTime(timeWithOffset, getTimeStringSeparator(timeWithOffset), true);
}

function getTimeStringSeparator(timeString: string): string {
  const matches = timeString.match(/[^Z+\-\d]/);
  return Array.isArray(matches) ? matches[0] : '';
}
