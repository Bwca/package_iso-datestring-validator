# iso-8601-date-string-validator

(the package will be republished on npm soon)

A simple function for ISO9601 date string validation. It validates any YYYY-MM-DD date from 0001-01-01 up to 9999-12-31 with a regular expression, leap years friendly.

The function itself takes two arguments, first being the date string, the second being an optional one symbol separator, by default it is

```
function(date, separator = "-")
```

The validation is done with a regular expression, which has been covered by jest tests. It correctly validates all dates between 0001-01-01 and 9999-12-31, correctly recognizing leap years.

## Install
```
npm i --save iso-datestring-validator
```
or
```
yarn add iso-datestring-validator
```

## Import and use
```
const isIsoDatestring = require("iso-datestring-validator");

isIsoDatestring('2019-01-01');
// true

isIsoDatestring('1900-02-29');
// false (1900 was not a leap year, so the date is invalid)
```

That's all there's to tell about this package.