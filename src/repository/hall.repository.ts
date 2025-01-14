import * as hallFactory from "../factory/hall.factory";
import { database } from "../config/database";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { hall } from "../schema/hall";

export async function insertHall(id: number, number: number, projectionQuality: string, cinemaId: number) {
    try {
        const preparedInsertHall = await database
            .insert(hall)
            .values(hallFactory.createHall(id, number, projectionQuality, cinemaId))
            .returning();

        return preparedInsertHall[0];
    } catch (error) {
        throw error;
    }
}

export async function updateHall(id: number, number: number|null, projectionQuality: string|null, cinemaId: number|null) {
    try {
        const preparedUpdateHall = await database
            .update(hall)
            .set({
                number: number ?? undefined,
                projectionQuality: projectionQuality ?? undefined,
                cinemaId: cinemaId ?? undefined
            })
            .where(eq(hall.id, id))
            .returning();

        return preparedUpdateHall[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteHall(id: number) {
    try {
        const preparedDeleteHall = await database
            .delete(hall)
            .where(eq(hall.id, id))
            .returning({ id: hall.id });

        return preparedDeleteHall[0];
    } catch (error) {
        throw error;
    }
}