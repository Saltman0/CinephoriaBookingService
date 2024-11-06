import * as drizzle from "drizzle-orm/pg-core";
import { booking } from "./booking";
import { seat } from "./seat";

export const bookingSeat = drizzle.pgTable("bookingSeat", {
    id: drizzle.integer().primaryKey().generatedAlwaysAsIdentity(),
    bookingId: drizzle.integer().references(() => booking.id, {onDelete: "cascade"}).notNull(),
    seatId: drizzle.integer().references(() => seat.id, {onDelete: "cascade"}).notNull()
});