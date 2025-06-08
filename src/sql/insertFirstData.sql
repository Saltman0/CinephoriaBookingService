-- Start the SQL transaction
BEGIN;

-- Insert booking
INSERT INTO "booking" ("qrCode", "userId", "showtimeId")
VALUES ('2025-06-07 18:00:00', 1, 1),
       ('2025-06-07 18:00:00', 2, 1),
       ('2025-06-07 18:00:00', 3, 1),
       ('2025-06-07 18:00:00', 4, 1),
       ('2025-06-07 18:00:00', 5, 1),
       ('2025-06-07 18:00:00', 1, 2),
       ('2025-06-07 18:00:00', 2, 2),
       ('2025-06-07 18:00:00', 3, 2),
       ('2025-06-07 18:00:00', 4, 2),
       ('2025-06-07 18:00:00', 5, 2);
-- Insert booking

SAVEPOINT booking_savepoint;

-- Insert bookingSeat
INSERT INTO "bookingSeat" ("bookingId", "seatId")
VALUES (1, 1),
       (1, 2),
       (2, 7),
       (2, 8),
       (2, 9),
       (3, 16),
       (4, 17),
       (4, 18),
       (4, 19),
       (5, 20),
       (6, 23),
       (6, 24),
       (7, 26),
       (7, 27),
       (8, 31),
       (9, 35),
       (9, 36),
       (10, 40);
-- Insert bookingSeat

SAVEPOINT bookingSeat_savepoint;

-- Commit if successful
COMMIT;