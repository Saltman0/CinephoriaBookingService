import * as hallRepository from "../repository/hall.repository";

export async function createHallEvent(hall: { id: number, number: number, projectionQuality: string, cinemaId: number }): Promise<void> {
    await hallRepository.insertHall(
        hall.id, hall.number, hall.projectionQuality, hall.cinemaId
    );
}

export async function updateHallEvent(hall: { id: number, number: number|null, projectionQuality: string|null, cinemaId: number|null }): Promise<void> {
    await hallRepository.updateHall(
        hall.id, hall.number, hall.projectionQuality, hall.cinemaId
    );
}

export async function deleteHallEvent(hall: { id: number }): Promise<void> {
    await hallRepository.deleteHall(hall.id);
}