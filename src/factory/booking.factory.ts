export function createBooking(userId: number, showtimeId: number) {
    return {
        userId: userId,
        showtimeId: showtimeId
    };
}