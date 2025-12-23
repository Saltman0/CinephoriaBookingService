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

export async function deleteBookingSeatBySeatId(seatId: number) {
    try {
        return await database
            .delete(bookingSeat)
            .where(eq(bookingSeat.seatId, seatId))
            .returning({id: bookingSeat.id});
    } catch (error) {
        throw error;
    }
}