export function createHall(id: number, number: number, projectionQuality: string, cinemaId: number) {
    return {
        id: id,
        number: number,
        projectionQuality: projectionQuality,
        cinemaId: cinemaId
    };
}