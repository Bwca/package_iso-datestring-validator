export function getStringSeparator(dateOrTimeString: string): string {
  const separator = /\D/.exec(dateOrTimeString);
  return separator ? separator[0] : '';
}
