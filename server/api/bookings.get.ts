import { db } from '../db/client';
import { bookings } from '../db/schema';
export default defineEventHandler(async () => db.select().from(bookings));