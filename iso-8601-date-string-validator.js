export function isValidISO8601DateString(date, separator = "-") {
  const validator = new RegExp(
    `^(?!0{4}${separator}0{2}${separator}0{2})((?=[0-9]{4}${separator}(((0[^2])|1[0-2])|02(?=${separator}(([0-1][0-9])|2[0-8])))${separator}[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))${separator}02${separator}29))(?:[0-9]{4})${separator}(?!((0[469])|11)${separator}31)((?:0[1,3-9]|1[0-2])|(?:02(?!${separator}3)))${separator}(?:[0-2][0-9]|3[0-1])$`
  );
  return validator.test(date);
}
