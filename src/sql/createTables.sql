-- Booking table
DROP TABLE IF EXISTS "booking";
CREATE TABLE IF NOT EXISTS "booking"
(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "showtimeId" INTEGER NOT NULL
);
-- Booking table

-- BookingSeat table
DROP TABLE IF EXISTS "bookingSeat";
CREATE TABLE IF NOT EXISTS "bookingSeat"
(
    "id" SERIAL PRIMARY KEY,
    "bookingId" INTEGER NOT NULL REFERENCES booking(id) ON DELETE CASCADE,
    "seatId" INTEGER NOT NULL
);
-- BookingSeat table
