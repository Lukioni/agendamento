PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`business_id` integer NOT NULL,
	`service_id` integer NOT NULL,
	`service_name` text NOT NULL,
	`staff_id` integer NOT NULL,
	`staff_name` text NOT NULL,
	`customer_name` text,
	`start_iso` text NOT NULL,
	`end_iso` text NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`staff_id`) REFERENCES `staff`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_bookings`("id", "business_id", "service_id", "service_name", "staff_id", "staff_name", "customer_name", "start_iso", "end_iso", "status") SELECT "id", "business_id", "service_id", "service_name", "staff_id", "staff_name", "customer_name", "start_iso", "end_iso", "status" FROM `bookings`;--> statement-breakpoint
DROP TABLE `bookings`;--> statement-breakpoint
ALTER TABLE `__new_bookings` RENAME TO `bookings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;