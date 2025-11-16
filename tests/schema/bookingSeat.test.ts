import { describe, it, expect } from "vitest";
import { bookingSeat } from "../../src/schema/bookingSeat";

describe("BookingSeat table schema", () => {

    it("should define 'id' as primary key with identity generation", () => {
        const idColumn = bookingSeat.id;
        expect(idColumn.name).toBe("id");
        expect(idColumn.dataType).toBe("number");
        expect(idColumn.primary).toBe(true);
        expect(idColumn.generatedIdentity.type).toBe("always");
    });

    it("should define 'bookingId' as NOT NULL integer", () => {
        const bookingIdColumn = bookingSeat.bookingId;
        expect(bookingIdColumn.name).toBe("bookingId");
        expect(bookingIdColumn.dataType).toBe("number");
        expect(bookingIdColumn.notNull).toBe(true);
    });

    it("should define 'seatId' as NOT NULL integer", () => {
        const seatIdColumn = bookingSeat.seatId;
        expect(seatIdColumn.name).toBe("seatId");
        expect(seatIdColumn.dataType).toBe("number");
        expect(seatIdColumn.notNull).toBe(true);
    });
});
