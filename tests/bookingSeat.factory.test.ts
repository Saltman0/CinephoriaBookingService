import { describe, it, expect } from 'vitest';
import { createBookingSeat } from '../src/factory/bookingSeat.factory';

describe('createBookingSeat', () => {

    it('should return a BookingSeat with the given userId and showtimeId', () => {
        const bookingId = 1;
        const seatId = 2;

        const result = createBookingSeat(bookingId, seatId);

        expect(result).toEqual({
            bookingId: 1,
            seatId: 2
        });
    });

});
