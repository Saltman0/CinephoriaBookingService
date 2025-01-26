import * as bookingFactory from "../factory/booking.factory";
import { database } from "../config/database";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { booking } from "../schema/booking";
import { bookingSeat } from "../schema/bookingSeat";
import { asc } from "drizzle-orm/sql/expressions/select";

export async function findBookingsByUser(userId: number) {
    try {
        return await database
            .select()
            .from(booking)
            .where(eq(booking.userId, userId))
            .orderBy(asc(booking.id));
    } catch (error) {
        throw error;
    }
}

export async function findBookingSeats(bookingId: number) {
    try {
        return await database
            .select()
            .from(bookingSeat)
            .where(eq(bookingSeat.bookingId, bookingId))
            .orderBy(asc(bookingSeat.id));
    } catch (error) {
        throw error;
    }
}

export async function findBookingById(id: number) {
    try {
        const result = await database
            .select()
            .from(booking)
            .where(eq(booking.id, id));

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function insertBooking(qrCode: string, userId: number, showtimeId: number) {
    try {
        const preparedInsertBooking = await database
            .insert(booking)
            .values(bookingFactory.createBooking(qrCode, userId, showtimeId))
            .returning();

        return preparedInsertBooking[0];
    } catch (error) {
        throw error;
    }
}

export async function updateBooking(id: number, qrCode: string|null, userId: number|null, showtimeId: number|null) {
    try {
        const preparedUpdateBooking = await database
            .update(booking)
            .set({
                qrCode: qrCode ?? undefined,
                userId: userId ?? undefined,
                showtimeId: showtimeId ?? undefined
            })
            .where(eq(booking.id, id))
            .returning();

        return preparedUpdateBooking[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteBooking(id: number) {
    try {
        const preparedDeleteBooking = await database
            .delete(booking)
            .where(eq(booking.id, id))
            .returning({ id: booking.id });

        return preparedDeleteBooking[0];
    } catch (error) {
        throw error;
    }
}