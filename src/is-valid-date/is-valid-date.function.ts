/**
 *
 * @param date YYYY-MM-DD
 * @param s separator symbol between years, months and days
 */
export function isValidDate(date: string, s = '-'): boolean {
  const validator = new RegExp(
    `^(?!0{4}${s}0{2}${s}0{2})((?=[0-9]{4}${s}(((0[^2])|1[0-2])|02(?=${s}(([0-1][0-9])|2[0-8])))${s}[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))${s}02${s}29))([0-9]{4})${s}(?!((0[469])|11)${s}31)((0[1,3-9]|1[0-2])|(02(?!${s}3)))${s}(0[1-9]|[1-2][0-9]|3[0-1])$`,
  );
  return validator.test(date);
}
