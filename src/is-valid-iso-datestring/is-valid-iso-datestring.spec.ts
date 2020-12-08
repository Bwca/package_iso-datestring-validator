import { SOME_VALID_ISO_DATETIME_STRINGS } from '../tests/constants/some-valid-iso-strings.const';
import { NEGATIVE_TIMEZONES } from '../tests/constants/timezones/negative-timezones.const';
import { POSITIVE_TIMEZONES } from '../tests/constants/timezones/positive-timezones.const';

import { isValidISODateString } from './is-valid-iso-datestring.function';

const noZoneValidISODateTimeString = '2019-07-09T15:03:36';

test(`isValidISODateString. expect all valid ISO 8601 strings to validate`, () => {
  // Arrange
  let results: boolean[];

  // Act
  results = SOME_VALID_ISO_DATETIME_STRINGS.map((s) => isValidISODateString(s));

  // Assert
  expect(results).not.toContain(false);
  expect(results).toMatchSnapshot();
});

test(`isValidISODateString. expect a valid ISO string to validate with all negative zone offsets`, () => {
  // Arrange
  let results: boolean[];

  // Act
  results = NEGATIVE_TIMEZONES.map((s) =>
    isValidISODateString(`${noZoneValidISODateTimeString}-${s}`),
  );

  // Assert
  expect(results).not.toContain(false);
  expect(results).toMatchSnapshot();
});

test(`isValidISODateString. expect a valid ISO string to validate with all positive zone offsets`, () => {
  // Arrange
  let results: boolean[];

  // Act
  results = POSITIVE_TIMEZONES.map((s) =>
    isValidISODateString(`${noZoneValidISODateTimeString}+${s}`),
  );

  // Assert
  expect(results).not.toContain(false);
  expect(results).toMatchSnapshot();
});

test('isValidISODateString does not validate date without time', () => {
  // Arrange
  const date = '2020-12-04';

  // Act
  const isValid = isValidISODateString(date);

  // Assert
  expect(isValid).toBeFalsy();
});
