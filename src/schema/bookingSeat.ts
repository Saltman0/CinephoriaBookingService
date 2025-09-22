import * as drizzle from "drizzle-orm/pg-core";
import { booking } from "./booking";

export const bookingSeat = drizzle.pgTable("bookingSeat", {
    id: drizzle.integer().primaryKey().generatedAlwaysAsIdentity(),
    bookingId: drizzle.integer().references(() => booking.id, {onDelete: "cascade"}).notNull(),
    seatId: drizzle.integer().notNull()
});