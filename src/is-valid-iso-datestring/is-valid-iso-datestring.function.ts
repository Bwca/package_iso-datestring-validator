import { isValidDate } from '../is-valid-date/is-valid-date.function';
import { isValidTime } from '../is-valid-time/is-valid-time.function';
import { isValidZoneOffset } from '../is-valid-timezone-offset/is-valid-timezone-offset.function';

export function isValidISODateString(dateString: string): boolean {
  const getStringSeparator = (datestr: string): string => {
    const separator = /\D/.exec(datestr);
    return separator ? separator[0] : '';
  };
  const [date, timeWithOffset] = dateString.split('T');
  const dateSeparator = getStringSeparator(date);
  const isDateValid = isValidDate(date, dateSeparator);

  if (timeWithOffset.includes('Z')) {
    const timeWithoutZone = timeWithOffset.replace('Z', '');
    return (
      isDateValid &&
      isValidTime(timeWithoutZone, getStringSeparator(timeWithoutZone))
    );
  }

  const offsetZone = timeWithOffset.includes('+') ? true : false;
  const [time, offset] = timeWithOffset.split(/[+-]/);
  return (
    isDateValid &&
    isValidTime(time, getStringSeparator(time)) &&
    isValidZoneOffset(offset, offsetZone, getStringSeparator(offset))
  );
}
