import moment from 'moment';

import { pad } from '../utils/tests/utility-functions/pad.function';

import { isValidDate } from './is-valid-date.function';

const isValidDateAsyncWrapper = (date: string, s = '-') =>
  Promise.resolve(isValidDate(date, s));

test(`isValidDate. expect all moment dates from 0001 up to year 5000 to be true. also expect all ISO strings to validate`, async () => {
  // Arrange
  const dateFormat = 'YYYY-MM-DD';
  const startDate = '0001-01-01';
  const endYear = 5000;
  const date = moment(startDate, dateFormat);
  const promisedResults: Array<Promise<boolean>> = [];
  let results: boolean[];

  // Act
  while (date.year() < endYear) {
    const currentDate = date.format(dateFormat);
    promisedResults.push(isValidDateAsyncWrapper(currentDate));
    date.add(1, 'd');
  }
  results = await Promise.all(promisedResults);

  // Assert
  expect(results).not.toContain(false);
  expect(results).toMatchSnapshot();
});

test(`isValidDate. expect all moment dates from 5000 up to year 10000 to be true. also expect all ISO strings to validate`, async () => {
  // Arrange
  const dateFormat = 'YYYY-MM-DD';
  const startDate = '5000-01-01';
  const endYear = 10000;
  const date = moment(startDate, dateFormat);
  const promisedResults: Array<Promise<boolean>> = [];
  let results: boolean[];

  // Act
  while (date.year() < endYear) {
    const currentDate = date.format(dateFormat);
    promisedResults.push(isValidDateAsyncWrapper(currentDate));
    date.add(1, 'd');
  }
  results = await Promise.all(promisedResults);

  // Assert
  expect(results).not.toContain(false);
  expect(results).toMatchSnapshot();
});

test(`isValidDate. expect function to return true, if passed an empty separator with a valid date`, () => {
  // Arrange
  const date = '20190101';
  const separator = '';
  let result: boolean;

  // Act
  result = isValidDate(date, separator);

  // Assert
  expect(result).toBe(true);
});

test(`isValidDate. expect function to return false, if a valid date contains an invalid digit separator`, () => {
  // Arrange
  const date = '2019/01/01';
  let result: boolean;

  // Act
  result = isValidDate(date);

  // Assert
  expect(result).toBe(false);
});

test(`isValidDate. expect function to return true, if valid date contains an different digit separator, which is provided as an argument`, () => {
  // Arrange
  const date = '2019/01/01';
  const separator = '/';
  let result: boolean;

  // Act
  result = isValidDate(date, separator);

  // Assert
  expect(result).toBe(true);
});

test(`isValidDate. expect 29 February to validate on leap years and fail on non-leap years from year 0001 to year 10000`, () => {
  // Arrange
  let year = 1;
  const maxYear = 10000;
  const digits = 4;
  const negativeChecks: boolean[] = [];
  const positiveChecks: boolean[] = [];

  // Act
  do {
    const decembetDate = `${pad(year.toString(), digits)}-02-29`;
    const isLeapYear = moment([year]).isLeapYear();
    const result = isValidDate(decembetDate);
    isLeapYear ? positiveChecks.push(result) : negativeChecks.push(result);
  } while (++year < maxYear);

  // Assert
  expect(positiveChecks).not.toContain(false);
  expect(negativeChecks).not.toContain(true);
  expect(positiveChecks).toMatchSnapshot();
  expect(negativeChecks).toMatchSnapshot();
});

test(`isValidDate. expect only 1-12 months to pass validation, 13-99 to fail`, () => {
  // Arrange
  let month = 1;
  const digits = 2;
  const negativeChecks: boolean[] = [];
  const positiveChecks: boolean[] = [];

  // Act
  do {
    const date = `2019-${pad(month.toString(), digits)}-01`;
    const result = isValidDate(date);

    month < 13 ? positiveChecks.push(result) : negativeChecks.push(result);
  } while (++month < 100);

  // Assert
  expect(positiveChecks).not.toContain(false);
  expect(negativeChecks).not.toContain(true);
  expect(positiveChecks).toMatchSnapshot();
  expect(negativeChecks).toMatchSnapshot();
});

test(`isValidDate. expect all dates after 31st to always fail for all months`, () => {
  // Arrange
  const maxDigits = 2;
  const results: boolean[] = [];

  // Act
  for (let month = 1; month < 13; month++) {
    let day = 32;
    do {
      const date = `2019-${pad(month.toString(), maxDigits)}-${day}`;
      results.push(isValidDate(date));
    } while (++day < 100);
  }

  // Assert
  expect(results).not.toContain(true);
  expect(results).toMatchSnapshot();
});

test(`isValidDate. September, April, June and November have 30 days, expect false when these months have 31st date`, () => {
  // Arrange
  const months = ['04', '06', '09', '11'];
  let results: boolean[];

  // Act
  results = months.map((m) => isValidDate(`2019-${m}-31`));

  // Assert
  expect(results).not.toContain(true);
  expect(results).toMatchSnapshot();
});

test(`isValidDate. February cannot have 30+ days`, () => {
  // Arrange
  const nonExistantFebruaryDays = ['2019-02-30', '2019-02-31'];
  let results: boolean[];

  // Act
  results = nonExistantFebruaryDays.map((i) => isValidDate(i));

  // Assert
  expect(results).not.toContain(true);
  expect(results).toMatchSnapshot();
});
