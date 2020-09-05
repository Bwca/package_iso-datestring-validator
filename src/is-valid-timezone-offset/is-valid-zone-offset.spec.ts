import { NEGATIVE_TIMEZONES } from '../tests/constants/timezones/negative-timezones.const';
import { POSITIVE_TIMEZONES } from '../tests/constants/timezones/positive-timezones.const';
import { pad } from '../tests/utility-functions/pad.function';

import { isValidZoneOffset } from './is-valid-timezone-offset.function';

const maxDigits = 2;

test(`isValidZoneOffset. expect all negative offsets to validate`, () => {
  // Arrange
  let results: boolean[];

  // Act
  results = NEGATIVE_TIMEZONES.map((i) => isValidZoneOffset(i, false));

  // Assert
  expect(results).not.toContain(false);
});

test(`isValidZoneOffset. expect all positive offsets to validate`, () => {
  // Arrange
  let results: boolean[];

  // Act
  results = POSITIVE_TIMEZONES.map((i) => isValidZoneOffset(i, true));

  // Assert
  expect(results).not.toContain(false);
});

test(`isValidZoneOffset. expect all non-existing negative zones to fail validation`, () => {
  // Arrange
  const negativeResults: boolean[] = [];

  // Act
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      const offset = `${pad(x.toString(), maxDigits)}:${pad(
        y.toString(),
        maxDigits,
      )}`;
      if (!NEGATIVE_TIMEZONES.includes(offset)) {
        negativeResults.push(isValidZoneOffset(offset, false));
      }
    }
  }

  // Assert
  expect(negativeResults).not.toContain(true);
});

test(`isValidZoneOffset. expect all non-existing positive zones to fail validation`, () => {
  // Arrange
  const negativeResults: boolean[] = [];

  // Act
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      const offset = `${pad(x.toString(), maxDigits)}:${pad(
        y.toString(),
        maxDigits,
      )}`;
      if (!POSITIVE_TIMEZONES.includes(offset)) {
        negativeResults.push(isValidZoneOffset(offset, true));
      }
    }
  }

  // Assert
  expect(negativeResults).not.toContain(true);
});
