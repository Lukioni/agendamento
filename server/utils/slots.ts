import { addMinutes, formatISO, isWithinInterval } from 'date-fns';
import { db } from '../db/client';
import { bookings, staffAvailability } from '../db/schema';
import { and, eq } from 'drizzle-orm';


export async function getSlots(opts: { staffId: number; serviceMinutes: number; dateISO: string }) {
const date = new Date(opts.dateISO); // yyyy-mm-ddT00:00:00Z
const weekday = date.getDay();


// availability for that weekday
const avails = await db.select().from(staffAvailability).where(and(eq(staffAvailability.staffId, opts.staffId), eq(staffAvailability.weekday, weekday)));
if (!avails.length) return [] as { start: string; end: string }[];


// bookings for that date
const dayStart = new Date(date); dayStart.setHours(0,0,0,0);
const dayEnd = new Date(date); dayEnd.setHours(23,59,59,999);
const existing = await db.select().from(bookings);


const result: { start: string; end: string }[] = [];
for (const a of avails) {
const base = new Date(date);
const availStart = new Date(base.setHours(0,0,0,0));
const start = addMinutes(availStart, a.startMin);
const end = addMinutes(availStart, a.endMin);


for (let t = new Date(start); addMinutes(t, opts.serviceMinutes) <= end; t = addMinutes(t, 30)) { // step = 30min
const slotEnd = addMinutes(t, opts.serviceMinutes);
const overlap = existing.some(b => {
if (b.staffId !== opts.staffId) return false;
const bs = new Date(b.startISO); const be = new Date(b.endISO);
return (t < be) && (slotEnd > bs);
});
if (!overlap) {
result.push({ start: formatISO(t), end: formatISO(slotEnd) });
}
}
}
return result;
}