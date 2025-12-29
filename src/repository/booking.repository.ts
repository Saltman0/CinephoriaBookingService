import {eq} from "drizzle-orm/sql/expressions/conditions";
import {asc} from "drizzle-orm/sql/expressions/select";
import {sql} from "drizzle-orm";
import {database} from "../config/database";
import {booking} from "../schema/booking";
import {bookingSeat} from "../schema/bookingSeat";
import * as bookingFactory from "../factory/booking.factory";

export async function findBookings(userId: number|null, showtimeId: number|null) {
    try {
        let request: string = 'SELECT * FROM "booking"';

        let whereCondition: string = "WHERE";

        if (userId !== null) {
            request += ` ${whereCondition} "booking"."userId" = ${userId}`;
            whereCondition = "AND";
        }
        if (showtimeId !== null) {
            request += ` ${whereCondition} "booking"."showtimeId" = ${showtimeId}`;
        }

        return await database.execute(sql.raw(request));
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

export async function insertBooking(userId: number, showtimeId: number) {
    try {
        const preparedInsertBooking = await database
            .insert(booking)
            .values(bookingFactory.createBooking(userId, showtimeId))
            .returning();

        return preparedInsertBooking[0];
    } catch (error) {
        throw error;
    }
}

export async function updateBooking(id: number, userId: number|null, showtimeId: number|null) {
    try {
        const preparedUpdateBooking = await database
            .update(booking)
            .set({
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

export async function deleteBookingByShowtimeId(showtimeId: number) {
    try {
        return await database
            .delete(booking)
            .where(eq(booking.showtimeId, showtimeId))
            .returning({id: booking.id});
    } catch (error) {
        throw error;
    }
}