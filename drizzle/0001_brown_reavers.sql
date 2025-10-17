ALTER TABLE `bookings` ADD `service_name` integer NOT NULL REFERENCES services(name);--> statement-breakpoint
ALTER TABLE `bookings` ADD `staff_name` integer NOT NULL REFERENCES staff(name);