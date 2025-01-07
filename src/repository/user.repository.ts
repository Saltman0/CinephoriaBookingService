import * as userFactory from "../factory/user.factory";
import { database } from "../config/database";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { user } from "../schema/user";

export async function insertUser(id: number, email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: string) {
    const preparedInsertUser = await database
        .insert(user)
        .values(userFactory.createUser(id, email, password, firstName, lastName, phoneNumber, role))
        .returning();

    try {
        return preparedInsertUser[0];
    } catch (error) {
        throw error;
    }
}

export async function updateUser(id: number, email: string|null, password: string|null, firstName: string|null, lastName: string|null, phoneNumber: string|null, role: string|null) {
    const preparedUpdateUser = await database
        .update(user)
        .set({
            email: email ?? undefined,
            password: password ?? undefined,
            firstName: firstName ?? undefined,
            lastName: lastName ?? undefined,
            phoneNumber: phoneNumber ?? undefined,
            role: role ?? undefined
        })
        .where(eq(user.id, id))
        .returning();

    try {
        return preparedUpdateUser[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id: number) {
    const preparedDeleteUser = await database
        .delete(user)
        .where(eq(user.id, id))
        .returning({ id: user.id });

    try {
        return preparedDeleteUser[0];
    } catch (error) {
        throw error;
    }
}