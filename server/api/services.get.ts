import { db } from '../db/client';
import { services } from '../db/schema';
export default defineEventHandler(async () => {
const data = await db.select().from(services);
return data;
});