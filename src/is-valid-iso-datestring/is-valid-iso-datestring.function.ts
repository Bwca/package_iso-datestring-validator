import { isValidDate } from '../is-valid-date/is-valid-date.function';
import { isValidTime } from '../is-valid-time/is-valid-time.function';
import { getStringSeparator } from '../utils/get-string-separator.function';

export function isValidISODateString(dateString: string): boolean {
  const [date, timeWithOffset] = dateString.split('T');
  const dateSeparator = getStringSeparator(date);
  const isDateValid = isValidDate(date, dateSeparator);

  return isDateValid && isValidTime(timeWithOffset, getTimeStringSeparator(timeWithOffset), true);
}

function getTimeStringSeparator(timeString: string): string {
  const matches = timeString.match(/[^Z+\-\d]/);
  return Array.isArray(matches) ? matches[0] : '';
}
