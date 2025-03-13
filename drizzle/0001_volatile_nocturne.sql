ALTER TABLE "two_factor" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "two_factor" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" DROP DEFAULT;