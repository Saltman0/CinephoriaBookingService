import express, { Express } from "express";
import cors from "cors";
import pino from "pino";
import bookingRoutes from "./routes/booking.routes";

export const port: number = 3000;

export const app: Express = express();

export const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
});

app.use(cors());
app.use(express.json());

app.use(bookingRoutes);