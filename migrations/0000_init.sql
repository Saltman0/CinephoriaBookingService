CREATE TABLE IF NOT EXISTS "booking" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "booking_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"showtimeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookingSeat" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookingSeat_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bookingId" integer NOT NULL,
	"seatId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingSeat" ADD CONSTRAINT "bookingSeat_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
