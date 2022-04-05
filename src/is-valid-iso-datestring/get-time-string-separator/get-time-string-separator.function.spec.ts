import { getTimeStringSeparator } from './get-time-string-separator.function';

describe('Core getTimeStringSeparator tests', () => {
  test(`getTimeStringSeparator needs consider '.' #33`, () => {
    // Arrange
    const time = '025001.957375256+0900';
    const expectedSeparator = '';

    // Act
    const separator = getTimeStringSeparator(time);

    // Assert
    expect(separator).toEqual(expectedSeparator);
  });
  test('Should extract :', () => {
    // Arrange
    const time = '15:03:36.000+00:00';
    const expectedSeparator = ':';

    // Act
    const separator = getTimeStringSeparator(time);

    // Assert
    expect(separator).toEqual(expectedSeparator);
  });
  test('Should extract empty string', () => {
    // Arrange
    const time = '150336Z';
    const expectedSeparator = '';

    // Act
    const separator = getTimeStringSeparator(time);

    // Assert
    expect(separator).toEqual(expectedSeparator);
  });
});
