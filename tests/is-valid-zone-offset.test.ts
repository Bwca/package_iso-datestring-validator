import { isValidZoneOffset } from '../src/iso-datestring-validator';

import { negativeZones } from './constants/timezones/negative-zones.const';
import { positiveZones } from './constants/timezones/positive-zones.const';
import { pad } from './utility-functions/pad.function';

const maxDigits = 2;

test(`isValidZoneOffset. expect all negative offsets to validate`, () => {
    negativeZones.forEach((i) => expect(isValidZoneOffset(i, false)).toBe(true));
});

test(`isValidZoneOffset. expect all positive offsets to validate`, () => {
    positiveZones.forEach((i) => expect(isValidZoneOffset(i, true)).toBe(true));
});

test(`isValidZoneOffset. expect all non-existing negative zones to fail validation`, () => {
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            const offset = `${pad(x.toString(), maxDigits)}:${pad(y.toString(), maxDigits)}`;
            if (!negativeZones.includes(offset)) {
                expect(isValidZoneOffset(offset, false)).toBe(false);
            }
        }
    }
});

test(`isValidZoneOffset. expect all non-existing positive zones to fail validation`, () => {
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            const offset = `${pad(x.toString(), maxDigits)}:${pad(y.toString(), maxDigits)}`;
            if (!positiveZones.includes(offset)) {
                expect(isValidZoneOffset(offset, true)).toBe(false);
            }
        }
    }
});
