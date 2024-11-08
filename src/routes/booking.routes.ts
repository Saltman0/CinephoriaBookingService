import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';

const router: Router = Router();

router.get("/booking", bookingController.getBookings);
router.get("/booking/:id", bookingController.getBookingById);
router.post("/booking", bookingController.createBooking);
router.put("/booking/:id", bookingController.updateBooking);
router.delete("/booking/:id", bookingController.deleteBooking);

export default router;