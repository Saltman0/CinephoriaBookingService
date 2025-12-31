import * as bookingRepository from "../repository/booking.repository";

export async function deleteBookingByShowtimeId(booking : {showtimeId: number}): Promise<void> {
    await bookingRepository.deleteBookingByShowtimeId(booking.showtimeId);
}

export async function deleteBookingByUserId(booking : {userId: number}): Promise<void> {
    await bookingRepository.deleteBookingByUserId(booking.userId);
}