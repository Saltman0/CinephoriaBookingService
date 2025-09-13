import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import passport from "../middleware/passport";

const router: Router = Router();

router.get("/booking", bookingController.getBookings);
router.get("/booking/:bookingId", bookingController.getBookingById);
router.get("/booking/:bookingId/bookingSeats", bookingController.getBookingSeats);
router.post("/booking", passport.authenticate("jwt", { session: false }), bookingController.createBooking);
router.put("/booking/:bookingId", passport.authenticate("jwt", { session: false }), bookingController.updateBooking);
router.delete("/booking/:bookingId", passport.authenticate("jwt", { session: false }), bookingController.deleteBooking);

export default router;