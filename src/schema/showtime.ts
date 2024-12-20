import * as drizzle from "drizzle-orm/pg-core";
import { hall } from "./hall";
import { movie } from "./movie";

export const showtime = drizzle.pgTable("showtime", {
    id: drizzle.integer().primaryKey().generatedAlwaysAsIdentity(),
    startTime: drizzle.timestamp().notNull(),
    endTime: drizzle.timestamp().notNull(),
    price: drizzle.integer().notNull(),
    movieId: drizzle.integer().references(() => movie.id, {onDelete: "cascade"}).notNull(),
    hallId: drizzle.integer().references(() => hall.id, {onDelete: "cascade"}).notNull()
});