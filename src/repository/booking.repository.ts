import * as bookingFactory from "../factory/booking.factory";
import { database } from "../config/database";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { booking } from "../schema/booking";

export async function findBookings(userId: number|null, showtimeId: number|null, startDate: Date|null, endDate: Date|null) {
    let findBookingsQuery = 'SELECT booking.id, booking."qrCode", showtime."startTime", showtime."endTime", hall."number", seat."row", seat."number" FROM booking' +
        " INNER JOIN bookingSeat ON bookingSeat.bookingId = booking.id" +
        " INNER JOIN seat ON bookingSeat.seatId = seat.id" +
        " INNER JOIN showtime ON booking.showtimeId = showtime.id" +
        " INNER JOIN hall ON showtimes.hallId = hall.id";

    if (userId !== null) {
        findBookingsQuery += ` WHERE booking.userId = ${userId}`;
    }

    if (showtimeId !== null) {
        findBookingsQuery += ` WHERE booking.showtimeId = ${showtimeId}`;
    }

    if (startDate !== null && endDate != null) {
        findBookingsQuery += ` WHERE showtime.startTime >= ${startDate} AND showtime.endTime <= ${endDate}`;
    }

    findBookingsQuery += " ORDER BY booking.id ASC";

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
            .where(eq(booking.id, id))
            .prepare("findBookingById")
            .execute();

        if (result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export async function insertBooking(qrCode: string, userId: number, showtimeId: number) {
    const preparedInsertBooking = database
        .insert(booking)
        .values(bookingFactory.createFactory(qrCode, userId, showtimeId))
        .prepare("insertBooking");

    try {
        await preparedInsertBooking.execute();
    } catch (error) {
        throw error;
    }
}

export async function updateBooking(id: number, qrCode: string|null, userId: number|null, showtimeId: number|null) {
    const preparedUpdateBooking = database
        .update(booking)
        .set({
            qrCode: qrCode ?? undefined,
            userId: userId ?? undefined,
            showtimeId: showtimeId ?? undefined
        })
        .where(eq(booking.id, id))
        .prepare("updateBooking");

    try {
        await preparedUpdateBooking.execute();
    } catch (error) {
        throw error;
    }
}

export async function deleteBooking(id: number) {
    const preparedDeleteBooking = database
        .delete(booking)
        .where(eq(booking.id, id))
        .prepare("deleteBooking");

    try {
        await preparedDeleteBooking.execute();
    } catch (error) {
        throw error;
    }
}