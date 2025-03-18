import { calculateEventPosition } from "./calculateEventPosition";

describe('calculateEventPosition', () => {
    test('return correctly top and height for event 9-11 in one day', () => {
      const dateStart = Math.floor(new Date('2025-03-03T09:00:00').getTime() / 1000);
      const dateEnd = Math.floor(new Date('2025-03-03T11:00:00').getTime() / 1000);
  
      const expected = {
        top: 40 + (9 - 8) * 48, 
        height: 2 * 48, 
      };
  
      expect(calculateEventPosition(dateStart, dateEnd)).toEqual(expected);
    });
  
    test('return correctly top and height for event 9.30-11.30 in one day', () => {
      const dateStart = Math.floor(new Date('2025-03-03T09:30:00').getTime() / 1000);
      const dateEnd = Math.floor(new Date('2025-03-03T11:30:00').getTime() / 1000);
  
      const expected = {
        top: 40 + (9 - 8 + 0.5) * 48,
        height: 2 * 48,
      };
  
      expect(calculateEventPosition(dateStart, dateEnd)).toEqual(expected);
    });
  
    test('return correctly top and height for 13-hours event', () => {
      const dateStart = Math.floor(new Date('2025-03-03T08:00:00').getTime() / 1000);
      const dateEnd = Math.floor(new Date('2025-03-03T21:00:00').getTime() / 1000);
  
      const expected = {
        top: 40 + (8 - 8) * 48,
        height: 13 * 48,
      };
  
      expect(calculateEventPosition(dateStart, dateEnd)).toEqual(expected);
    });
    test('return correctly top and height for event 8.15 - 9', () => {
        const dateStart = Math.floor(new Date('2025-03-03T08:15:00').getTime() / 1000);
        const dateEnd = Math.floor(new Date('2025-03-03T09:00:00').getTime() / 1000);
    
        const expected = {
          top: 40 + (8 - 8 + 0.25) * 48,
          height: 0.75 * 48,
        };
    
        expect(calculateEventPosition(dateStart, dateEnd)).toEqual(expected);
      });

  });