import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import passport from "../middleware/passport";

const router: Router = Router();

router.get("/booking/:userId", /*passport.authenticate("jwt", { session: false }),*/ bookingController.getBookings);
router.get("/booking/:id", passport.authenticate("jwt", { session: false }), bookingController.getBookingById);
router.post("/booking", passport.authenticate("jwt", { session: false }), bookingController.createBooking);
router.put("/booking/:id", passport.authenticate("jwt", { session: false }), bookingController.updateBooking);
router.delete("/booking/:id", passport.authenticate("jwt", { session: false }), bookingController.deleteBooking);

export default router;