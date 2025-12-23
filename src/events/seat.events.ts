import * as bookingSeatRepository from "../repository/bookingSeat.repository";

export async function deleteSeatEvent(seat: { id: number }): Promise<void> {
    await bookingSeatRepository.deleteBookingSeatBySeatId(seat.id);
}