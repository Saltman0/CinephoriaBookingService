DROP TABLE "cinema";--> statement-breakpoint
DROP TABLE "hall";--> statement-breakpoint
DROP TABLE "movie";--> statement-breakpoint
DROP TABLE "seat";--> statement-breakpoint
DROP TABLE "showtime";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_showtimeId_showtime_id_fk";
--> statement-breakpoint
ALTER TABLE "bookingSeat" DROP CONSTRAINT "bookingSeat_seatId_seat_id_fk";
