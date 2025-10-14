import { db } from '../../db/client';
import { bookings } from '../../db/schema';
import { eq } from 'drizzle-orm';


export default defineEventHandler(async (e) => {
const id = Number(getRouterParam(e, 'id'));
await db.delete(bookings).where(eq(bookings.id, id));
return { ok: true };
});