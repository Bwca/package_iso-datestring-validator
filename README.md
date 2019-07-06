# iso-8601-date-string-validator

A simple function for ISO9601 date string validation. It validates any YYYY-MM-DD date from 0001-01-01 up to 9999-12-31 with a regular expression, leap years friendly.

The function itself takes two arguments, first being the date string, the second being an optional one symbol separator, by default it is

```
isValidISO8601DateString(date, separator = "-")
```

The validation is done with a regular expression, which has been covered by jest tests. It correctly validates all dates between 0001-01-01 and 9999-12-31, correctly recognizing leap years.
