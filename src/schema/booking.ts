import * as drizzle from "drizzle-orm/pg-core";

export const booking = drizzle.pgTable("booking", {
    id: drizzle.integer().primaryKey().generatedAlwaysAsIdentity(),
    qrCode: drizzle.text().notNull(),
    userId: drizzle.integer().notNull(),
    showtimeId: drizzle.integer().notNull()
});