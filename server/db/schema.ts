import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';


export const businesses = sqliteTable('businesses', {
id: integer('id').primaryKey({ autoIncrement: true }),
name: text('name').notNull(),
});


export const locations = sqliteTable('locations', {
id: integer('id').primaryKey({ autoIncrement: true }),
businessId: integer('business_id').notNull().references(() => businesses.id),
name: text('name').notNull(),
});


export const services = sqliteTable('services', {
id: integer('id').primaryKey({ autoIncrement: true }),
businessId: integer('business_id').notNull().references(() => businesses.id),
name: text('name').notNull(),
price: real('price').notNull(),
durationMin: integer('duration_min').notNull(),
});


export const staff = sqliteTable('staff', {
id: integer('id').primaryKey({ autoIncrement: true }),
businessId: integer('business_id').notNull().references(() => businesses.id),
name: text('name').notNull(),
});


export const staffServices = sqliteTable('staff_services', {
id: integer('id').primaryKey({ autoIncrement: true }),
staffId: integer('staff_id').notNull().references(() => staff.id),
serviceId: integer('service_id').notNull().references(() => services.id),
});


export const staffAvailability = sqliteTable('staff_availability', {
id: integer('id').primaryKey({ autoIncrement: true }),
staffId: integer('staff_id').notNull().references(() => staff.id),
weekday: integer('weekday').notNull(), // 0..6 (sun..sat)
startMin: integer('start_min').notNull(), // minutes since 00:00
endMin: integer('end_min').notNull(),
});


export const bookings = sqliteTable('bookings', {
id: integer('id').primaryKey({ autoIncrement: true }),
businessId: integer('business_id').notNull().references(() => businesses.id),
serviceId: integer('service_id').notNull().references(() => services.id),
staffId: integer('staff_id').notNull().references(() => staff.id),
customerName: text('customer_name'),
startISO: text('start_iso').notNull(), // ISO string
endISO: text('end_iso').notNull(),
status: text('status').notNull().default('confirmed'),
});


export const indices = {
bookingsStaffTimeIdx: sql`CREATE INDEX IF NOT EXISTS idx_bookings_staff_time ON bookings (staff_id, start_iso, end_iso);`,
};