-- Cinéphoria booking service database
DROP DATABASE IF EXISTS "cinephoriaBookingServiceDatabase";
CREATE DATABASE "cinephoriaBookingServiceDatabase";
-- Cinéphoria booking service database

-- Booking table
DROP TABLE IF EXISTS "booking";
CREATE TABLE IF NOT EXISTS "booking"
(
    "id" SERIAL PRIMARY KEY,
    "qrCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "showtimeId" INTEGER NOT NULL
);
-- Booking table

-- BookingSeat table
DROP TABLE IF EXISTS "bookingSeat";
CREATE TABLE IF NOT EXISTS "bookingSeat"
(
    "id" SERIAL PRIMARY KEY,
    "bookingId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL
);
-- BookingSeat table
