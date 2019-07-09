/**
 * 
 * @param date YYYY-MM-DD
 * @param s separator symbol between years, months and days
 */
export function isValidDate(date: string, s = "-"): boolean {
  const validator = new RegExp(
    `^(?!0{4}${s}0{2}${s}0{2})((?=[0-9]{4}${s}(((0[^2])|1[0-2])|02(?=${s}(([0-1][0-9])|2[0-8])))${s}[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))${s}02${s}29))([0-9]{4})${s}(?!((0[469])|11)${s}31)((0[1,3-9]|1[0-2])|(02(?!${s}3)))${s}([0-2][0-9]|3[0-1])$`
  );
  return validator.test(date);
};

/**
 * 
 * @param date YYYY-MM
 * @param s separator between hours and minutes
 */
export function isValidYearMonth(date: string, s = '-'): boolean {
  const validator = new RegExp(`^[0-9]{4}${s}(0(?=[^0])|1(?=[0-2]))[0-9]$`);
  return validator.test(date);
}

/**
 * 
 * @param time hh:mm:ss (optional)
 * @param s separator between hours, minutes and optional seconds
 */
export function isValidTime(time: string, s = ':'): boolean {
  const validator = new RegExp(`^([0-1]|2(?=([0-3])|4${s}00))[0-9]${s}[0-5][0-9](${s}([0-5]|6(?=0))[0-9])?$`);
  return validator.test(time);
}

export function isValidISOString(dateString: string): boolean {
  const [date, timeWithOffset] = dateString.split('T');
  const dateSeparator = getStringSeparator(date);
  const isDateValid = isValidDate(date, dateSeparator);

  if (/[+±]/.test(timeWithOffset)) {
    const [time, offset] = timeWithOffset.split(/[+±]/);
    return isDateValid && isValidTime(time, getStringSeparator(time)) && isValidZoneOffset(offset, true);
  }

  if (/-/.test(timeWithOffset)) {
    const [time, offset] = timeWithOffset.split(/-/);
    return isDateValid && isValidTime(time, getStringSeparator(time)) && isValidZoneOffset(offset, false);
  }

  const time = timeWithOffset.replace('Z', '');
  const timeSeparator = getStringSeparator(time);
  return isDateValid && isValidTime(time, timeSeparator);
}

export function isValidZoneOffset(offset: string, isPositiveOffset: boolean): boolean {
  return isPositiveOffset ? /^(0|1(?=([0-1]|2(?=:[04])|[34](?=:0))))([03469](?=:[03])|[17](?=:0)|2(?=:[04])|5(?=:[034])|8(?=:[04])):([03](?=0)|4(?=5))[05]$/.test(offset) : /^(0(?=[^0])|1(?=[0-2]))([39](?=:[03])|[0-24-8](?=:00)):[03]0$/.test(offset);
}

function getStringSeparator(datestr: string): string {
  const separator = /\D/.exec(datestr);
  return separator ? separator[0] : '';
}

['2019-07-07T12:58:13+00:00', '2019-07-07T12:58:13Z', '20190707T125813Z'].forEach(i => console.log(isValidISOString(i)));

/**
12:00
11:00
10:00
09:30
09:00
08:00
07:00
06:00
05:00
04:00
03:30
03:00
02:00
01:00
 */


/**
00:00
01:00
02:00
03:00
03:30
04:00
04:30
05:00
05:30
05:45
06:00
06:30
07:00
08:00
08:45
09:00
09:30
10:00
10:30
11:00
12:00
12:45
13:00
14:00
 */