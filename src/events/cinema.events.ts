import * as cinemaRepository from "../repository/cinema.repository";

export async function createCinemaEvent(cinema: { id: number, name: string, address: string, postalCode: number,
    city: string, phoneNumber: string, openHour: string, closeHour: string }): Promise<void> {
    await cinemaRepository.insertCinema(
        cinema.id, cinema.name, cinema.address, cinema.postalCode, cinema.city,
        cinema.phoneNumber, cinema.openHour, cinema.closeHour
    );
}

export async function updateCinemaEvent(cinema: { id: number, name: string|null, address: string|null,
    postalCode: number|null, city: string|null, phoneNumber: string|null, openHour: string|null,
    closeHour: string|null }): Promise<void> {
    await cinemaRepository.updateCinema(
        cinema.id, cinema.name, cinema.address, cinema.postalCode, cinema.city, cinema.phoneNumber,
        cinema.openHour, cinema.closeHour
    );
}

export async function deleteCinemaEvent(cinema: { id: number }): Promise<void> {
    await cinemaRepository.deleteCinema(cinema.id);
}