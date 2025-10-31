import { Request, Response } from "express";
import Stripe from "stripe";

export async function createPayment(req: Request, res: Response) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        const paymentLink = await stripe.paymentIntents.create({
            amount: req.body.price,
            currency: "eur",
            automatic_payment_methods: { enabled: true }
        });

        res.status(200).json({ clientSecret: paymentLink.client_secret });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}