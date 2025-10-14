import { z } from 'zod';
import { getSlots } from '../utils/slots';
import { db } from '../db/client';
import { services } from '../db/schema';
import { eq } from 'drizzle-orm';

const q = z.object({ staffId: z.coerce.number(), serviceId: z.coerce.number(), date: z.string() });

export default defineEventHandler(async (e) => {
  const { staffId, serviceId, date } = q.parse(getQuery(e));
  const [svc] = await db.select().from(services).where(eq(services.id, serviceId));
  if (!svc) throw createError({ statusCode: 404, statusMessage: 'Service not found' });
  return getSlots({ staffId, serviceMinutes: svc.durationMin, dateISO: new Date(date).toISOString() });
});
