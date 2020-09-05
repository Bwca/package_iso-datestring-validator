export function getStringSeparator(dateString: string): string {
  const separator = /\D/.exec(dateString);
  return separator ? separator[0] : '';
}
