/**
 *
 * @param offset
 * @param isPositiveOffset the flag, which determines if the zone has positive or negative offset
 * 00:00 is considered a positive zone
 * @param s separator
 */
export function isValidZoneOffset(
  offset: string,
  isPositiveOffset: boolean,
  s = ':',
): boolean {
  const validator = new RegExp(
    isPositiveOffset
      ? `^(0(?!(2${s}4)|0${s}3)|1(?=([0-1]|2(?=${s}[04])|[34](?=${s}0))))([03469](?=${s}[03])|[17](?=${s}0)|2(?=${s}[04])|5(?=${s}[034])|8(?=${s}[04]))${s}([03](?=0)|4(?=5))[05]$`
      : `^(0(?=[^0])|1(?=[0-2]))([39](?=${s}[03])|[0-24-8](?=${s}00))${s}[03]0$`,
  );
  return validator.test(offset);
}
