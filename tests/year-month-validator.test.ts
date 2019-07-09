import { isValidYearMonth } from '../src/iso-datestring-validator';
import { pad } from './utility-functions/pad.function';

/** max number of digits in hour/minute */
const maxDigits = 2;

test(`isValidYearMonth. expect months 01-12 to pass, 00 and 13+ to fail`, () => {
    for (let month = 0; month < 100; month++) {
        const validationResult = isValidYearMonth(`2019-${pad(month.toString(), maxDigits)}`);
        month > 0 && month < 13 ? expect(validationResult).toBe(true) : expect(validationResult).toBe(false);
    }
});

test(`isValidYearMonth. expect YYYYMM to validate when passed empty separator, else to fail`, () => {
    expect(isValidYearMonth(`201901`, '')).toBe(true);
    expect(isValidYearMonth(`201901`)).toBe(false);
});