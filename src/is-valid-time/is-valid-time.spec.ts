import { pad } from '../tests/utility-functions/pad.function';

import { isValidTime } from './is-valid-time.function';

/** max number of digits in hour/minute */
const maxDigits = 2;

test(`isValidTime. expect all hours with 0 minutes from 00:00 to 24:00 to validate true, 25+ hours to validate false`, () => {
  // Arrange
  const negativeResults: boolean[] = [];
  const positiveResults: boolean[] = [];

  // Act
  for (let hour = 0; hour <= 99; hour++) {
    const validationResult = isValidTime(
      `${pad(hour.toString(), maxDigits)}:00:00`,
    );

    hour < 25
      ? positiveResults.push(validationResult)
      : negativeResults.push(validationResult);
  }

  // Assert
  expect(positiveResults).not.toContain(false);
  expect(negativeResults).not.toContain(true);
  expect(positiveResults).toMatchSnapshot();
  expect(negativeResults).toMatchSnapshot();
});

test(`isValidTime. expect all minutes to validate beween 0 and 59, and to fail afterwards (from 60 to 99)`, () => {
  // Arrange
  const negativeResults: boolean[] = [];
  const positiveResults: boolean[] = [];

  // Act
  for (let minute = 0; minute <= 99; minute++) {
    const validationResult = isValidTime(
      `00:${pad(minute.toString(), maxDigits)}:00`,
    );
    minute < 60
      ? positiveResults.push(validationResult)
      : negativeResults.push(validationResult);
  }

  // Assert
  expect(positiveResults).not.toContain(false);
  expect(negativeResults).not.toContain(true);
  expect(positiveResults).toMatchSnapshot();
  expect(negativeResults).toMatchSnapshot();
});

test(`isValidTime. expect 24:00 to validate and 24:01-59 to fail`, () => {
  // Arrange
  const negativeResults: boolean[] = [];
  const positiveResults: boolean[] = [];

  // Act
  for (let minute = 0; minute <= 59; minute++) {
    const validationResult = isValidTime(
      `24:${pad(minute.toString(), maxDigits)}`,
    );
    minute === 0
      ? positiveResults.push(validationResult)
      : negativeResults.push(validationResult);
  }

  // Assert
  expect(positiveResults).not.toContain(false);
  expect(negativeResults).not.toContain(true);
  expect(positiveResults).toMatchSnapshot();
  expect(negativeResults).toMatchSnapshot();
});

test(`isValidTime. HH:mm to validate if empty separator is passed`, () => {
  // Arrange
  const time = '2200';
  const separator = '';
  let result: boolean;

  // Act
  result = isValidTime(time, separator);

  // Assert
  expect(result).toBe(true);
});

test(`isValidSeconds. expect seconds to validate only from 0 to 60, to fail when > 60`, () => {
  // Arrange
  const negativeResults: boolean[] = [];
  const positiveResults: boolean[] = [];

  // Act
  for (let second = 0; second < 100; second++) {
    const validationResult = isValidTime(
      `00:00:${pad(second.toString(), maxDigits)}.000`,
    );
    second <= 60
      ? positiveResults.push(validationResult)
      : negativeResults.push(validationResult);
  }

  // Assert
  expect(positiveResults).not.toContain(false);
  expect(negativeResults).not.toContain(true);
  expect(positiveResults).toMatchSnapshot();
  expect(negativeResults).toMatchSnapshot();
});

test(`isValidTime. expect time to validate when no separator provided`, () => {
  // Arrange
  const time = '00:00:00.111';
  const separator = ':';
  let result: boolean;

  // Act
  result = isValidTime(time, separator);

  // Assert
  expect(result).toBe(true);
});
