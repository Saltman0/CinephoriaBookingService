import * as bookingFactory from "../factory/booking.factory";
import { database } from "../config/database";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { booking } from "../schema/booking";

export async function findBookings(userId: number|null, showtimeId: number|null, startDate: Date|null, endDate: Date|null) {
    let findBookingsQuery = 'SELECT "booking"."id", "booking"."qrCode", "showtime"."startTime", "showtime"."endTime", "hall"."number", "seat"."row", "seat"."number" FROM "booking"' +
        ' INNER JOIN "bookingSeat" ON "bookingSeat"."bookingId" = "booking"."id"' +
        ' INNER JOIN "seat" ON "bookingSeat"."seatId" = "seat"."id"' +
        ' INNER JOIN "showtime" ON "booking"."showtimeId" = "showtime"."id"' +
        ' INNER JOIN "hall" ON "showtime"."hallId" = "hall"."id"';

    if (userId !== null) {
        findBookingsQuery += ` WHERE "booking"."userId" = ${userId}`;
    }

    if (showtimeId !== null) {
        findBookingsQuery += ` WHERE "booking"."showtimeId" = ${showtimeId}`;
    }

    if (startDate !== null && endDate != null) {
        findBookingsQuery += ` WHERE "showtime"."startTime" >= ${startDate} AND "showtime"."endTime" <= ${endDate}`;
    }

    findBookingsQuery += ' ORDER BY "booking"."id" ASC;';

    try {
        let result = await database.execute(findBookingsQuery);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows;
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