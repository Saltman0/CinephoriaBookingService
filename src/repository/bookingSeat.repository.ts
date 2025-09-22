import * as bookingSeatFactory from "../factory/bookingSeat.factory";
import {database} from "../config/database";
import {bookingSeat} from "../schema/bookingSeat";

export async function insertBookingSeat(bookingId: number, seatIds: number[]) {
    try {
        let bookingSeats: {bookingId: number, seatId: number}[] = [];
        seatIds.forEach((seatId: number): void => {
            bookingSeats.push(bookingSeatFactory.createBookingSeat(bookingId, seatId));
        });

        return await database
            .insert(bookingSeat)
            .values(bookingSeats)
            .returning();
    } catch (error) {
        throw error;
    }
}