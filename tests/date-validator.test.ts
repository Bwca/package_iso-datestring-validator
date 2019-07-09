import * as moment from 'moment';
import { isValidDate } from '../src/iso-datestring-validator';
import { pad } from './utility-functions/pad.function';

test(`isValidDate. expect all moment dates from 0001 up to year 10000 to be true`, () => {
  const dateFormat = "YYYY-MM-DD";
  const startDate = `0001-01-01`;
  const endYear = 10000;
  const date = moment(startDate, dateFormat);
  while (date.year() < endYear) {
    expect(isValidDate(date.format(dateFormat))).toBe(true);
    date.add(1, "d");
  }
});

test(`isValidDate. expect function to return true, if passed an empty separator with a valid date`, () => {
  expect(isValidDate("20190101", '')).toBe(true);
});

test(`isValidDate. expect function to return false, if a valid date contains an invalid digit separator`, () => {
  expect(isValidDate("2019/01/01")).toBe(false);
});

test(`isValidDate. expect function to return true, if valid date contains an different digit separator, which is provided as an argument`, () => {
  expect(isValidDate("2019/01/01", "/")).toBe(true);
});

test(`isValidDate. expect 29 February to validate on leap years and fail on non-leap years from year 0001 to year 10000`, () => {
  let year = 1;
  const maxYear = 10000;
  const digits = 4;
  while (year < maxYear) {
    const decembetDate = `${pad(year.toString(), digits)}-02-29`;
    !moment([year]).isLeapYear() ? expect(isValidDate(decembetDate)).toBe(false) : expect(isValidDate(decembetDate)).toBe(true);
    year++;
  }
});

test(`isValidDate. expect only 1-12 months to pass validation, 13-99 to fail`, () => {
  let month = 1;
  const digits = 2;

  while (month < 100) {
    const date = `2019-${pad(month.toString(), digits)}-01`;
    month < 13 ? expect(isValidDate(date)).toBe(true) : expect(isValidDate(date)).toBe(false);
    month++;
  }
});

test(`isValidDate. expect all dates after 31st to always fail for all months`, () => {
  const maxDigits = 2;
  for (let month = 1; month < 13; month++) {
    let day = 32;
    while (day < 100) {
      const date = `2019-${pad(month.toString(), maxDigits)}-${day}`;
      expect(isValidDate(date)).toBe(false);
      day++;
    }
  }
});

test(`isValidDate. September, April, June and November have 30 days, expect false when these months have 31st date`, () => {
  const months = ["04", "06", "09", "11"];
  months.forEach(m => expect(isValidDate(`2019-${m}-31`)).toBe(false));
});

test(`isValidDate. February cannot have 30+ days`, () => {
  expect(isValidDate(`2019-02-30`)).toBe(false);
  expect(isValidDate(`2019-02-31`)).toBe(false);
});
