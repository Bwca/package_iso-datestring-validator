import { isValidISODateString } from '../src/iso-datestring-validator';
import { negativeZones } from './constants/timezones/negative-zones.const';
import { positiveZones } from './constants/timezones/positive-zones.const';
import { validISODateStrings } from './constants/valid-iso-strings.const';

const noZoneString = '2019-07-09T15:03:36';

test(`isValidISODateString. expect all valid ISO 8601 strings to validate`, () => {
    validISODateStrings.forEach(s => expect(isValidISODateString(s)).toBe(true));
});

test(`isValidISODateString. expect a valid ISO string to validate with all negative zone offsets`, () => {
    negativeZones.forEach(s => expect(isValidISODateString(`${noZoneString}-${s}`)).toBe(true));
});

test(`isValidISODateString. expect a valid ISO string to validate with all positive zone offsets`, () => {
    positiveZones.forEach(s => expect(isValidISODateString(`${noZoneString}+${s}`)).toBe(true));
});
