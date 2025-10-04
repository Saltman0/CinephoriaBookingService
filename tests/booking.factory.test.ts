import { describe, it, expect } from 'vitest';
import { createBooking } from '../src/factory/booking.factory';

describe('createBooking', () => {

    it('should return a Booking with the given userId and showtimeId', () => {
        const userId = 1;
        const showtimeId = 2;

        const result = createBooking(userId, showtimeId);

        expect(result).toEqual({
            userId: 1,
            showtimeId: 2
        });
    });

});
