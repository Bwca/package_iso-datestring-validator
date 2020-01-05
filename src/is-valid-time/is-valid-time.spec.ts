import { pad } from '../tests/utility-functions/pad.function';

import { isValidTime } from './is-valid-time.function';

/** max number of digits in hour/minute */
const maxDigits = 2;

test(`isValidTime. expect all hours with 0 minutes from 00:00 to 24:00 to validate true, 25+ hours to validate false`, () => {
  for (let hour = 0; hour <= 99; hour++) {
    const validationResult = isValidTime(
      `${pad(hour.toString(), maxDigits)}:00:00`,
    );
    hour < 25
      ? expect(validationResult).toBe(true)
      : expect(validationResult).toBe(false);
  }
});

test(`isValidTime. expect all minutes to validate beween 0 and 59, and to fail afterwards (from 60 to 99)`, () => {
  for (let minute = 0; minute <= 99; minute++) {
    const validationResult = isValidTime(
      `00:${pad(minute.toString(), maxDigits)}:00`,
    );
    minute < 60
      ? expect(validationResult).toBe(true)
      : expect(validationResult).toBe(false);
  }
});

test(`isValidTime. expect 24:00 to validate and 24:01-59 to fail`, () => {
  for (let minute = 0; minute <= 59; minute++) {
    const validationResult = isValidTime(
      `24:${pad(minute.toString(), maxDigits)}`,
    );
    minute === 0
      ? expect(validationResult).toBe(true)
      : expect(validationResult).toBe(false);
  }
});

test(`isValidTime. HH:mm to validate if empty separator is passed`, () => {
  expect(isValidTime('2200', '')).toBe(true);
});

test(`isValidSeconds. expect seconds to validate only from 0 to 60, to fail when > 60`, () => {
  for (let second = 0; second < 100; second++) {
    const secondValidationResult = isValidTime(
      `00:00:${pad(second.toString(), maxDigits)}.000`,
    );
    second <= 60
      ? expect(secondValidationResult).toBe(true)
      : expect(secondValidationResult).toBe(false);
  }
});

test(`isValidTime. expect time to validate when no separator provided`, () => {
  expect(isValidTime(`00:00:00.111`, ':')).toBe(true);
});
