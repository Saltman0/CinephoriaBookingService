import { Request, Response } from "express";
import * as bookingRepository from "../repository/booking.repository";
import * as amqp from "amqplib/callback_api";

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

        console.log("test0");

        amqp.connect('amqp://guest:guest@172.18.0.7:5672', function(error0, connection) {
            console.log("test");
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                let queue: string = 'hello';
                let msg: string = 'Hello world';

                channel.assertQueue(queue, {
                    durable: true
                });

                channel.sendToQueue(queue, Buffer.from(msg), {
                    persistent: true
                });
                console.log(" [x] Sent %s", msg);
            });

            setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 500);
        });

        /*amqp.connect('amqp://default_user_-NkjeqsWJAWu6Z_EuHh:ZXRj3lOUQiOzvQAbZOza-mpnHyIIra8r@10.96.79.151', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                let queue = 'hello';

                channel.assertQueue(queue, {
                    durable: true
                });

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
                channel.consume(queue, function(msg) {
                    // @ts-ignore
                    console.log(" [x] Received %s", msg.content.toString());
                    setTimeout(function() {
                        console.log(" [x] Done");
                        if (msg) {
                            channel.ack(msg);
                        }
                    }, 1000);
                }, {
                    noAck: false
                });
            });
        });*/

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