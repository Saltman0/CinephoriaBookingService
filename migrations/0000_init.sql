CREATE TABLE IF NOT EXISTS "booking" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "booking_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"qrCode" text NOT NULL,
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
CREATE TABLE IF NOT EXISTS "cinema" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cinema_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"postalCode" integer NOT NULL,
	"city" varchar NOT NULL,
	"phoneNumber" varchar NOT NULL,
	"openHour" time NOT NULL,
	"closeHour" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hall" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hall_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"number" integer NOT NULL,
	"projectionQuality" varchar NOT NULL,
	"cinemaId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movie" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movie_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"minimumAge" integer,
	"favorite" boolean,
	"imageURL" varchar NOT NULL,
	CONSTRAINT "movie_imageURL_unique" UNIQUE("imageURL")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seat" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "seat_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"row" varchar NOT NULL,
	"number" integer NOT NULL,
	"hallId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "showtime" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "showtime_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"price" integer NOT NULL,
	"movieId" integer NOT NULL,
	"hallId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"phoneNumber" varchar NOT NULL,
	"role" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_showtimeId_showtime_id_fk" FOREIGN KEY ("showtimeId") REFERENCES "public"."showtime"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingSeat" ADD CONSTRAINT "bookingSeat_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."booking"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingSeat" ADD CONSTRAINT "bookingSeat_seatId_seat_id_fk" FOREIGN KEY ("seatId") REFERENCES "public"."seat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hall" ADD CONSTRAINT "hall_cinemaId_cinema_id_fk" FOREIGN KEY ("cinemaId") REFERENCES "public"."cinema"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seat" ADD CONSTRAINT "seat_hallId_hall_id_fk" FOREIGN KEY ("hallId") REFERENCES "public"."hall"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "showtime" ADD CONSTRAINT "showtime_movieId_movie_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movie"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "showtime" ADD CONSTRAINT "showtime_hallId_hall_id_fk" FOREIGN KEY ("hallId") REFERENCES "public"."hall"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
