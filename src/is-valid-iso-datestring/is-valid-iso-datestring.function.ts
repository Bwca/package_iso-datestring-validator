import { getStringSeparator } from '../get-string-separator/get-string-separator.function';
import { isValidDate } from '../is-valid-date/is-valid-date.function';
import { isValidTime } from '../is-valid-time/is-valid-time.function';

import { getTimeStringSeparator } from './get-time-string-separator/get-time-string-separator.function';

export function isValidISODateString(dateString: string): boolean {
  const [date, timeWithOffset] = dateString.split('T');
  const dateSeparator = getStringSeparator(date);
  const isDateValid = isValidDate(date, dateSeparator);

  if (!timeWithOffset) {
    return false;
  }

  const timeStringSeparator = getTimeStringSeparator(timeWithOffset);

  return isDateValid && isValidTime(timeWithOffset, timeStringSeparator, true);
}
