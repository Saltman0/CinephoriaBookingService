import EventEmitter from "node:events";
import * as seatEvents from "./seat.events";
import * as bookingEvents from "./booking.events";

export const eventEmitter: EventEmitter = new EventEmitter();

eventEmitter.on("messageReceived", async (message: { type: string, event: string, body: any }): Promise<void> => {
    try {
        const actions: { [key: string]: (message: any) => Promise<void> } = {
            "deleteSeat": seatEvents.deleteSeatEvent,
            "deleteByShowtimeBooking": bookingEvents.deleteBookingByShowtimeId
        };

        const key: string = `${message.event}${message.type.charAt(0).toUpperCase() + message.type.slice(1)}`;

        if (actions[key]) {
            await actions[key](message.body);
        } else {
            console.log("Invalid type or event !");
        }
    } catch (error) {
        throw error;
    }
});