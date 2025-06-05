-- Cinéphoria movie service database
DROP DATABASE IF EXISTS "cinephoriaBookingServiceDatabase";
CREATE DATABASE "cinephoriaBookingServiceDatabase";
-- Cinéphoria movie service database

-- Booking table
DROP TABLE IF EXISTS "booking";
CREATE TABLE IF NOT EXISTS "booking"
(
    "id" SERIAL PRIMARY KEY,
    "qrCode" TEXT NOT NULL,
    "userId" INTEGER REFERENCES "user"(id) ON UPDATE NO ACTION ON DELETE CASCADE,
    "showtimeId" INTEGER REFERENCES "showtime"(id) ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Booking table

-- BookingSeat table
DROP TABLE IF EXISTS "bookingSeat";
CREATE TABLE IF NOT EXISTS "bookingSeat"
(
    "id" SERIAL PRIMARY KEY,
    "bookingId" INTEGER REFERENCES "booking"(id) ON UPDATE NO ACTION ON DELETE CASCADE,
    "seatId" INTEGER REFERENCES "seat"(id) ON UPDATE NO ACTION ON DELETE CASCADE
);
-- BookingSeat table