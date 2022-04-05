export function getTimeStringSeparator(timeString: string): string {
  const matches = timeString.match(/([^Z+\-\d])(?=\d+\1)/);
  return Array.isArray(matches) ? matches[0] : '';
}
