/**
 *
 * @param date YYYY-MM
 * @param s separator between hours and minutes
 */
export function isValidYearMonth(date: string, s = '-'): boolean {
  const validator = new RegExp(`^[0-9]{4}${s}(0(?=[^0])|1(?=[0-2]))[0-9]$`);
  return validator.test(date);
}
