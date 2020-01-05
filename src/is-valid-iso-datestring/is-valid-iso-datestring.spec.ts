import { SOME_VALID_ISO_DATETIME_STRINGS } from '../tests/constants/some-valid-iso-strings.const';
import { NEGATIVE_TIMEZONES } from '../tests/constants/timezones/negative-timezones.const';
import { POSITIVE_TIMEZONES } from '../tests/constants/timezones/positive-timezones.const';

import { isValidISODateString } from './is-valid-iso-datestring.function';

const noZoneString = '2019-07-09T15:03:36';

test(`isValidISODateString. expect all valid ISO 8601 strings to validate`, () => {
  SOME_VALID_ISO_DATETIME_STRINGS.forEach((s) =>
    expect(isValidISODateString(s)).toBe(true),
  );
});

test(`isValidISODateString. expect a valid ISO string to validate with all negative zone offsets`, () => {
  NEGATIVE_TIMEZONES.forEach((s) =>
    expect(isValidISODateString(`${noZoneString}-${s}`)).toBe(true),
  );
});

test(`isValidISODateString. expect a valid ISO string to validate with all positive zone offsets`, () => {
  POSITIVE_TIMEZONES.forEach((s) =>
    expect(isValidISODateString(`${noZoneString}+${s}`)).toBe(true),
  );
});
