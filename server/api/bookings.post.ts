import { z } from 'zod';
import { db } from '../db/client';
import { bookings, services as svcTable } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';

const bodySchema = z.object({
  businessId: z.number().default(1),
  serviceId: z.number(),
  serviceName: z.string(),
  staffId: z.number(),
  staffName: z.string(),
  customerName: z.string().optional(),
  startISO: z.string(),
});

export default defineEventHandler(async (e) => {
  const raw = await readBody(e);
  const body = bodySchema.parse(raw);

  // pega serviço (usa eq() do Drizzle)
  const [svc] = await db.select().from(svcTable).where(eq(svcTable.id, body.serviceId));
  if (!svc) throw createError({ statusCode: 400, statusMessage: 'Invalid service' });

  const start = new Date(body.startISO);
  const end = new Date(start.getTime() + svc.durationMin * 60_000);

  // conflito: staffId igual E intervalo sobreposto
  // Overlap rule: NOT (existing.end <= new.start OR existing.start >= new.end)
  const [conflictRow] = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(and(
      eq(bookings.staffId, body.staffId),
      sql`NOT (${bookings.endISO} <= ${start.toISOString()} OR ${bookings.startISO} >= ${end.toISOString()})`
    ))
    .limit(1);

  if (conflictRow) {
    throw createError({ statusCode: 409, statusMessage: 'Slot no longer available' });
  }

  const inserted = await db.insert(bookings).values({
    businessId: body.businessId,
    serviceId: body.serviceId,
    serviceName: body.serviceName,
    staffId: body.staffId,
    staffName: body.staffName,
    customerName: body.customerName ?? 'Guest',
    startISO: start.toISOString(),
    endISO: end.toISOString(),
    status: 'confirmed',
  }).returning();

  return inserted[0];
});
