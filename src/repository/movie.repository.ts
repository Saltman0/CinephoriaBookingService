import * as movieFactory from "../factory/movie.factory";
import { database } from "../config/database";
import { movie } from "../schema/movie";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export async function findMovies(cinemaId: number|null, categoryId: number|null, startDate: Date|null, endDate: Date|null) {
    let findMoviesQuery = 'SELECT * FROM "movie"';

    if (cinemaId !== null || (startDate !== null && endDate !== null)) {
        findMoviesQuery += ' INNER JOIN "showtime" ON "showtime"."movieId" = "movie"."id"' +
            ' INNER JOIN "hall" ON "showtime"."hallId" = "hall"."id"';

        if (cinemaId !== null) {
            findMoviesQuery += ` WHERE "hall"."cinemaId" = ${cinemaId}`;
        }

        if (startDate !== null && endDate != null) {
            findMoviesQuery += ` WHERE "showtime"."startTime" >= ${startDate} AND "showtime"."endTime" <= ${endDate}`;
        }
    }

    if (categoryId !== null) {
        findMoviesQuery += ` WHERE "movie"."categoryId" = ${categoryId}`;
    }

    findMoviesQuery += ' ORDER BY "movie"."id" ASC';

    try {
        let result = await database.execute(findMoviesQuery);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows;
    } catch (error) {
        throw error;
    }
}

export async function findMovieById(id: number) {
    try {
        const result = await database
            .select()
            .from(movie)
            .where(eq(movie.id, id));

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function insertMovie(id: number, title: string, description: string, minimumAge: number, favorite: boolean, imageURL: string) {
    try {
        const preparedInsertMovie = await database
            .insert(movie)
            .values(movieFactory.createMovie(id, title, description, minimumAge, favorite, imageURL))
            .returning();

        return preparedInsertMovie[0];
    } catch (error) {
        throw error;
    }
}

export async function updateMovie(id: number, title: string|null, description: string|null, minimumAge: number|null, favorite: boolean|null, imageURL: string|null) {
    try {
        const preparedUpdateMovie = await database
            .update(movie)
            .set({
                title: title ?? undefined,
                description: description ?? undefined,
                minimumAge: minimumAge ?? undefined,
                favorite: favorite ?? undefined,
                imageURL: imageURL ?? undefined
            })
            .where(eq(movie.id, id))
            .returning();

        return preparedUpdateMovie[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteMovie(id: number) {
    try {
        const preparedDeleteMovie = await database
            .delete(movie)
            .where(eq(movie.id, id))
            .returning({ id: movie.id });

        return preparedDeleteMovie[0];
    } catch (error) {
        throw error;
    }
}