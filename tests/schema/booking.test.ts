import { describe, it, expect } from "vitest";
import { booking } from "../../src/schema/booking";

describe("Booking table schema", () => {

    it("should define 'id' as primary key with identity generation", () => {
        const idColumn = booking.id;
        expect(idColumn.name).toBe("id");
        expect(idColumn.primary).toBe(true);
    });

    it("should define 'userId' as NOT NULL integer", () => {
        const userIdColumn = booking.userId;
        expect(userIdColumn.name).toBe("userId");
        expect(userIdColumn.notNull).toBe(true);
    });

    it("should define 'showtimeId' as NOT NULL integer", () => {
        const showtimeIdColumn = booking.showtimeId;
        expect(showtimeIdColumn.name).toBe("showtimeId");
        expect(showtimeIdColumn.notNull).toBe(true);
    });
});
