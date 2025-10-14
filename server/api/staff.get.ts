import { db } from '../db/client';
import { staff } from '../db/schema';
export default defineEventHandler(async () => {
return db.select().from(staff);
});