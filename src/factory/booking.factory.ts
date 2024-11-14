export function createBooking(qrCode: string, userId: number, showtimeId: number) {
    return {
        qrCode: qrCode,
        userId: userId,
        showtimeId: showtimeId
    };
}