import { pad } from '../utils/tests/utility-functions/pad.function';

import { isValidYearMonth } from './is-valid-year-month.function';

/** max number of digits in hour/minute */
const maxDigits = 2;

test(`isValidYearMonth. expect months 01-12 to pass, 00 and 13+ to fail`, () => {
  // Arrange
  const positiveResults: boolean[] = [];
  const negativeResults: boolean[] = [];

  // Act
  for (let month = 0; month < 100; month++) {
    const validationResult = isValidYearMonth(
      `2019-${pad(month.toString(), maxDigits)}`,
    );
    month > 0 && month < 13
      ? positiveResults.push(validationResult)
      : negativeResults.push(validationResult);
  }

  // Assert
  expect(positiveResults).not.toContain(false);
  expect(negativeResults).not.toContain(true);
});

test(`isValidYearMonth. expect YYYYMM to validate when passed empty separator, else to fail`, () => {
  // Arrange
  const date = '201901';
  const separator = '';
  let positiveResult: boolean;
  let negativeResult: boolean;

  // Act
  positiveResult = isValidYearMonth(date, separator);
  negativeResult = isValidYearMonth(date);

  // Assert
  expect(positiveResult).toBe(true);
  expect(negativeResult).toBe(false);
});
