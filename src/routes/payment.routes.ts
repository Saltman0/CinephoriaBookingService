import {Router} from "express";
import passport from "../middleware/passport";
import * as paymentController from '../controllers/payment.controller';

const router: Router = Router();

router.post(
    "/payment",
    passport.authenticate("jwt", { session: false }),
    paymentController.createPayment
);

export default router;