import { roundToNearestHalfHour } from './roundToNearestHalfHour'; 

describe('roundToNearestHalfHour', () => {
  test('rounds to the previous half hour if minutes are less than 30', () => {
    const date = new Date('2025-03-18T12:15:00');
    const roundedDate = roundToNearestHalfHour(date);
    expect(roundedDate.getHours()).toBe(12);
    expect(roundedDate.getMinutes()).toBe(0);
  });

  test('rounds to the next half hour if minutes are 30 or more', () => {
    const date = new Date('2025-03-18T12:45:00');
    const roundedDate = roundToNearestHalfHour(date);
    expect(roundedDate.getHours()).toBe(13);
    expect(roundedDate.getMinutes()).toBe(30);
  });

  test('rounds correctly when minutes are exactly 0', () => {
    const date = new Date('2025-03-18T12:00:00');
    const roundedDate = roundToNearestHalfHour(date);
    expect(roundedDate.getHours()).toBe(12);
    expect(roundedDate.getMinutes()).toBe(0);
  });

  test('rounds correctly when minutes are exactly 30', () => {
    const date = new Date('2025-03-18T12:30:00');
    const roundedDate = roundToNearestHalfHour(date);
    expect(roundedDate.getHours()).toBe(12);
    expect(roundedDate.getMinutes()).toBe(30);
  });
});
