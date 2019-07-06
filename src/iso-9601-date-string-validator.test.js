const moment = require("moment");
const isIsoDatestring = require("./iso-8601-date-string-validator");

/** add extra zeros to number if needed */
function pad(string, max) {
  string = string.toString();
  return string.length < max ? pad("0" + string, max) : string;
}

test(`expect all moment dates from 0001 up to year 10000 to be true`, () => {
  const dateFormat = "YYYY-MM-DD";
  const startDate = `0001-01-01`;
  const endYear = 10000;
  const date = moment(startDate, dateFormat);

  while (date.year() < endYear) {
    expect(isIsoDatestring(date.format(dateFormat))).toBe(true);
    date.add(1, "d");
  }
});

test(`expect function to return false, if a valid date contains
an invalid digit separator`, () => {
  expect(isIsoDatestring("2019/01/01")).toBe(false);
});

test(`expect function to return true, if valid date contains
an different digit separator, which is provided as an argument`, () => {
  expect(isIsoDatestring("2019/01/01", "/")).toBe(true);
});

test(`expect 29 February to validate on leap years and fail on 
non-leap years from year 0001 to year 10000`, () => {
  let year = 1;
  const maxYear = 10000;
  const digits = 4;

  pad = (string, max) => {
    string = string.toString();
    return string.length < max ? pad("0" + string, max) : string;
  };

  while (year < maxYear) {
    const decembetDate = `${pad(year, digits)}-02-29`;
    if (!moment([year]).isLeapYear()) {
      expect(isIsoDatestring(decembetDate)).toBe(false);
    } else {
      expect(isIsoDatestring(decembetDate)).toBe(true);
    }
    year++;
  }
});

test(`expect only 1-12 months to pass validation, 13-99 to fail`, () => {
  let month = 1;
  const digits = 2;

  while (month < 100) {
    const date = `2019-${pad(month, digits)}-01`;

    if (month < 13) {
      expect(isIsoDatestring(date)).toBe(true);
    } else {
      expect(isIsoDatestring(date)).toBe(false);
    }

    month++;
  }
});

test(`expect all dates after 31st to always fail for all months`, () => {
  const maxDigits = 2;
  for (let month = 1; month < 13; month++) {
    let day = 32;
    while (day < 100) {
      const date = `2019-${pad(month, maxDigits)}-${day}`;
      expect(isIsoDatestring(date)).toBe(false);
      day++;
    }
  }
});

test(`September, April, June and November have 30 days, 
expect false when these months have 31st date`, () => {
  const months = ["04", "06", "09", "11"];

  months.forEach(m => expect(isIsoDatestring(`2019-${m}-31`)).toBe(false));
});

test(`February cannot have 30+ days`, () => {
  expect(isIsoDatestring(`2019-02-30`)).toBe(false);
  expect(isIsoDatestring(`2019-02-31`)).toBe(false);
});
