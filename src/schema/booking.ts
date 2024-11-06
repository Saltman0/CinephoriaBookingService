import * as drizzle from "drizzle-orm/pg-core";
import { showtime } from "./showtime";
import { user } from "./user";

export const booking = drizzle.pgTable("booking", {
    id: drizzle.integer().primaryKey().generatedAlwaysAsIdentity(),
    qrCode: drizzle.text().notNull(),
    userId: drizzle.integer().references(() => user.id, {onDelete: "cascade"}).notNull(),
    showtimeId: drizzle.integer().references(() => showtime.id, {onDelete: "cascade"}).notNull()
});