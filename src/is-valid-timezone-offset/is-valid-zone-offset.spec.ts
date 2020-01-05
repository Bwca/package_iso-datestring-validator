import { NEGATIVE_TIMEZONES } from '../tests/constants/timezones/negative-timezones.const';
import { POSITIVE_TIMEZONES } from '../tests/constants/timezones/positive-timezones.const';
import { pad } from '../tests/utility-functions/pad.function';

import { isValidZoneOffset } from './is-valid-timezone-offset.function';

const maxDigits = 2;

test(`isValidZoneOffset. expect all negative offsets to validate`, () => {
  NEGATIVE_TIMEZONES.forEach((i) =>
    expect(isValidZoneOffset(i, false)).toBe(true),
  );
});

test(`isValidZoneOffset. expect all positive offsets to validate`, () => {
  POSITIVE_TIMEZONES.forEach((i) =>
    expect(isValidZoneOffset(i, true)).toBe(true),
  );
});

test(`isValidZoneOffset. expect all non-existing negative zones to fail validation`, () => {
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      const offset = `${pad(x.toString(), maxDigits)}:${pad(
        y.toString(),
        maxDigits,
      )}`;
      if (!NEGATIVE_TIMEZONES.includes(offset)) {
        expect(isValidZoneOffset(offset, false)).toBe(false);
      }
    }
  }
});

test(`isValidZoneOffset. expect all non-existing positive zones to fail validation`, () => {
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      const offset = `${pad(x.toString(), maxDigits)}:${pad(
        y.toString(),
        maxDigits,
      )}`;
      if (!POSITIVE_TIMEZONES.includes(offset)) {
        expect(isValidZoneOffset(offset, true)).toBe(false);
      }
    }
  }
});
