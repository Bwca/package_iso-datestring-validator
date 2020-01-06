# iso-datestring-validator

## What is it

A simple package for validating strings denoting dates and time, including ISO 8601 format. The package provides the following functions:

1. Date validation. YYYY-MM-DD format from 0001-01-01 to 9999-12-31, leap year friendly. Custom digit separators and null separators supported: YYYY/MM/DD or YYYYMMDD is no problem.
2. Time validation. HH:mm:ss.fff format, seconds and fractions of seconds being optional. Custom digit separators supported for HHmmss as well (no custom separator for fractions, it is dot).
3. Year-month validation.
4. **ISO 8601 datestring validation** with timezones, with and without separators:
* 2019-07-09T15:03:36.000+00:00
* 2019-07-09T15:03:36Z
* 20190709T150336Z

## Installation
```
npm i --save iso-datestring-validator
```
or
```
yarn add iso-datestring-validator
```

## Import
```
import isoDatestringValidator from "iso-datestring-validator";
```
or
```
const isoDatestringValidator = require("iso-datestring-validator");
```

## Usage

### Date validation

Pass a **YYYY-MM-DD** date string to the **isValidDate** function to check it. To validate dates that use a custom digit separator, pass it as the second argument. 
```
const isoDatestringValidator = require("iso-datestring-validator");

isoDatestringValidator.isValidDate("2019-01-31");
// true

isoDatestringValidator.isValidDate("20190131");
// false, no custom digit separator provided, hyphen separator not found in the string

isoDatestringValidator.isValidDate("20190131", '');
// true

isoDatestringValidator.isValidDate("2019/01/31", '/');
// true
```

### Time validation
Time string in HH:mm:ss.fff format can be validated with the **isValidTime** function. Seconds and fractions are optional. However, if using fractions min number of numbers is 1 and max is 9.

```
const isoDatestringValidator = require("iso-datestring-validator");

isoDatestringValidator.isValidTime("13:00");
// true

isoDatestringValidator.isValidTime("13:00:00");
// true

isoDatestringValidator.isValidTime("13:00:00.000000000");
// true
```

### Year and month validation

These are validated by the **isValidYearMonth** function. Rules same as in the previous case: a string **YYYY-MM** and a custom digit separator if required.

```
const isoDatestringValidator = require("iso-datestring-validator");

isoDatestringValidator.isValidYearMonth("2019/01", '/');
// true
isoDatestringValidator.isValidYearMonth("2019-01");
// true
```

### ISO 8601 datestring validation
Pass a string to **isValidISODateString** to see if it is valid.
```
const isoDatestringValidator = require("iso-datestring-validator");

isoDatestringValidator.isValidISODateString('2019-07-09T15:03:36.000+00:00');
// true

isoDatestringValidator.isValidISODateString('20190709T150336Z');
// true
```

That's all about this package. Have fun, feel free to contribute with some test :]