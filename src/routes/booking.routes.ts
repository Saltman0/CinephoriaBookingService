import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import passport from "../middleware/passport";

const router: Router = Router();

router.get("/booking", bookingController.getBookings); // Passer par GraphQL
router.get("/booking/:bookingId", passport.authenticate("jwt", { session: false }), bookingController.getBookingById);
router.get("/booking/:bookingId/bookingSeats", passport.authenticate("jwt", { session: false }), bookingController.getBookingSeats); // Passer par GraphQL
router.post("/booking", passport.authenticate("jwt", { session: false }), bookingController.createBooking);
router.put("/booking/:bookingId", passport.authenticate("jwt", { session: false }), bookingController.updateBooking);
router.delete("/booking/:bookingId", passport.authenticate("jwt", { session: false }), bookingController.deleteBooking);

export default router;