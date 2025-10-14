import { db } from './client';
import { businesses, locations, services, staff, staffAvailability, staffServices } from './schema';


export async function seed() {
const [{ lastInsertRowid: bizId }] = await db.insert(businesses).values({ name: 'Demo Barber' }).returning({ lastInsertRowid: businesses.id });
const [{ lastInsertRowid: locId }] = await db.insert(locations).values({ businessId: Number(bizId), name: 'Unidade Centro' }).returning({ lastInsertRowid: locations.id });


const s1 = await db.insert(services).values([
{ businessId: Number(bizId), name: 'Corte', price: 60, durationMin: 30 },
{ businessId: Number(bizId), name: 'Barba', price: 90, durationMin: 30 },
{ businessId: Number(bizId), name: 'Corte + Barba', price: 140, durationMin: 60 },
]).returning({ id: services.id });


const st = await db.insert(staff).values([
{ businessId: Number(bizId), name: 'Edson' },
{ businessId: Number(bizId), name: 'Rui' },
{ businessId: Number(bizId), name: 'Amanda' },
]).returning({ id: staff.id });


// todos atendem todos os serviços (simplificação)
for (const t of st) for (const s of s1) {
await db.insert(staffServices).values({ staffId: t.id, serviceId: s.id });
}


// disponibilidade 09:00–18:00 seg–sex
for (const t of st) {
for (const d of [1,2,3,4,5]) {
await db.insert(staffAvailability).values({ staffId: t.id, weekday: d, startMin: 9*60, endMin: 18*60 });
}
}


console.log('Seed OK');
}


if (import.meta.url === `file://${process.argv[1]}`) {
seed();
}