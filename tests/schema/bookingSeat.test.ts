import { describe, it, expect } from "vitest";
import { bookingSeat } from "../../src/schema/bookingSeat";

describe("Booking table schema", () => {

    it("should define 'id' as primary key with identity generation", () => {
        const idColumn = bookingSeat.id;
        expect(idColumn.name).toBe("id");
        expect(idColumn.primary).toBe(true);
    });

    it("should define 'bookingId' as NOT NULL integer", () => {
        const bookingIdColumn = bookingSeat.bookingId;
        expect(bookingIdColumn.name).toBe("bookingId");
        expect(bookingIdColumn.notNull).toBe(true);
    });

    it("should define 'seatId' as NOT NULL integer", () => {
        const seatIdColumn = bookingSeat.seatId;
        expect(seatIdColumn.name).toBe("seatId");
        expect(seatIdColumn.notNull).toBe(true);
    });
});
