CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"transaction_id" text NOT NULL,
	"method" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"url" text,
	"amount" integer NOT NULL,
	"status" integer NOT NULL,
	"times" integer NOT NULL,
	"customer_id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;