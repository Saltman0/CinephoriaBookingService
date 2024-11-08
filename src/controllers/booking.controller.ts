import { Request, Response } from "express";
import * as bookingRepository from "../repository/booking.repository";

export async function getBookings(req: Request, res: Response) {
    try {
        const bookings = await bookingRepository.findBookings(
            req.params.userId ? parseInt(req.params.userId) : null,
            req.params.showtimeId ? parseInt(req.params.showtimeId) : null,
            req.params.startDate ? new Date(req.params.startDate) : null,
            req.params.endDate ? new Date(req.params.endDate) : null
        );

        if (bookings !== null) {
            res.status(200).json(bookings);
        } else {
            res.status(404).json({error : `Bookings not found.`});
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function getBookingById(req: Request, res: Response) {
    try {
        const booking = await bookingRepository.findBookingById(
            parseInt(req.params.id)
        );

        if (booking !== null) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({error : `Booking ${req.params.id} not found.`});
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

        res.status(200).json(bookingToCreate);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export async function updateBooking(req: Request, res: Response) {
    try {
        const bookingToUpdate = await bookingRepository.updateBooking(
            parseInt(req.params.id),
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
        const bookingToDelete = await bookingRepository.deleteBooking(
            parseInt(req.params.id)
        );

        res.status(200).json(bookingToDelete);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}