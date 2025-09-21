-- Start the SQL transaction
BEGIN;

    -- Bookings
    INSERT INTO "booking" ("userId", "showtimeId")
    VALUES (1,1),
           (2,2),
           (3,3),
           (4,4),
           (5,5),
           (6,6),
           (7,7),
           (8,8),
           (9,9),
           (10,10),
           (1,11),
           (2,12),
           (3,13),
           (4,14),
           (5,15)
    ;
    -- Bookings

    -- Booking seats
    INSERT INTO "bookingSeat" ("bookingId", "seatId")
    VALUES (1,1),
           (1,2),
           (2,11),
           (3,23),
           (3,24),
           (4,33),
           (5,45),
           (5,46),
           (6,51),
           (6,52),
           (7,7),
           (8,19),
           (9,29),
           (9,30),
           (10,41),
           (11,6),
           (12,15),
           (13,25),
           (14,35),
           (15,55)
    ;

-- Commit if successful
COMMIT;

-- If something fails instead
ROLLBACK;