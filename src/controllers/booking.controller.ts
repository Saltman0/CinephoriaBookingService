import { Request, Response } from "express";
import * as bookingRepository from "../repository/booking.repository";

export async function getBookingsByUser(req: Request, res: Response) {
    try {
        const bookings = await bookingRepository.findBookingsByUser(
            parseInt(req.params.userId)
        );

        res.status(200).json(bookings);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getBookingSeats(req: Request, res: Response) {
    try {
        const bookingSeats = await bookingRepository.findBookingSeats(
            parseInt(req.params.bookingId)
        );

        res.status(200).json(bookingSeats);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getBookingById(req: Request, res: Response) {
    try {
        const booking = await bookingRepository.findBookingById(
            parseInt(req.params.bookingId)
        );

        if (booking !== null) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message : `Booking ${req.params.id} not found.` });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function createBooking(req: Request, res: Response) {
    try {
        const bookingToCreate = await bookingRepository.insertBooking(
            req.body.qrCode,
            parseInt(req.body.userId),
            parseInt(req.body.showtimeId)
        );

        res.status(201).json(bookingToCreate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function updateBooking(req: Request, res: Response) {
    try {
        const bookingToUpdate = await bookingRepository.updateBooking(
            parseInt(req.params.bookingId),
            req.body.qrCode,
            parseInt(req.body.userId),
            parseInt(req.body.showtimeId)
        );

        res.status(200).json(bookingToUpdate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function deleteBooking(req: Request, res: Response) {
    try {
        await bookingRepository.deleteBooking(parseInt(req.params.bookingId));

        res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}