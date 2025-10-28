import { Request, Response } from "express";
import Stripe from "stripe";

export async function createPayment(req: Request, res: Response) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Réservation des sièges'
                        },
                        unit_amount: req.body.price
                    },
                    quantity: 1
                },
            ],
            payment_method_types: ['card'],
            after_completion: {
                type: "redirect",
                redirect: { url: "http://localhost:4200/home" }
            }
        });

        res.status(200).json(paymentLink.url);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}