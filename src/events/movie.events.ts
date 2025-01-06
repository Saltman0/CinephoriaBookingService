import * as movieRepository from "../repository/movie.repository";

export async function createMovieEvent(movie: { id: number, title: string, description: string, minimumAge: number, favorite: boolean, imageURL: string }) {
    await movieRepository.insertMovie(movie.id, movie.title, movie.description, movie.minimumAge, movie.favorite, movie.imageURL);
}

export async function updateMovieEvent(movie: { id: number, title: string, description: string, minimumAge: number, favorite: boolean, imageURL: string }) {
    await movieRepository.updateMovie(movie.id, movie.title, movie.description, movie.minimumAge, movie.favorite, movie.imageURL);
}

export async function deleteMovieEvent(movie: { id: number }) {
    await movieRepository.deleteMovie(movie.id);
}