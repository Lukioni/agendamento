<script setup lang="ts">
const services:any = await $fetch('/api/services');
const staff:any = await $fetch('/api/staff');


const selectedService = ref<number | null>(services[0]?.id ?? null);
const selectedServiceName = ref<number | null>(services[0]?.name ?? null);
const selectedStaffName = ref<number | null>(staff[0]?.name ?? null);
const selectedStaff = ref<number | null>(staff[0]?.id ?? null);
const date = ref<string>(new Date().toISOString().slice(0,10)); // yyyy-mm-dd
const customerName = ref('')

const slots = ref<{ start: string; end: string }[]>([]);


async function loadSlots() {
if (!selectedService.value || !selectedStaff.value) return;
slots.value = await $fetch('/api/slots', {
query: { serviceId: selectedService.value, staffId: selectedStaff.value, date: date.value }
});
}


watch([selectedService, selectedStaff, date], loadSlots, { immediate: true });


async function book(slot: { start: string }) {
if (!selectedService.value || !selectedStaff.value) return;
const created = await $fetch('/api/bookings', {
method: 'POST', body: {
businessId: 1,
serviceId: selectedService.value,
serviceName: selectedServiceName.value,
staffId: selectedStaff.value,
staffName: selectedStaffName.value,
startISO: slot.start,
customerName: customerName.value
}
}).catch((e) => { alert(e?.data?.message || 'Erro'); });
if (created) {console.log(created), alert('Agendado!'); await loadSlots(); }
}
</script>


<template>
<div class="max-w-4xl mx-auto p-6 space-y-8">
<h1 class="text-2xl font-semibold">Agendar</h1>


<section>
<h2 class="font-medium mb-2">Selecione o Serviço</h2>
<div class="flex gap-3 flex-wrap">
<button v-for="s in services" :key="s.id" @click="selectedService = s.id"
class="px-4 py-2 rounded-xl border"
:class="selectedService===s.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-300'">
<div class="font-medium">{{ s.name }}</div>
<div class="text-sm opacity-70">R$ {{ s.price.toFixed(2) }} • {{ s.durationMin }}min</div>
</button>
</div>
</section>


<section>
<h2 class="font-medium mb-2">Selecione o Profissional</h2>
<div class="flex gap-3 flex-wrap">
<button v-for="t in staff" :key="t.id" @click="selectedStaff = t.id"
class="px-4 py-2 rounded-xl border"
:class="selectedStaff===t.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-300'">
{{ t.name }}
</button>
</div>
</section>


<section>
<h2 class="font-medium mb-2">Selecione a Data</h2>
<input type="date" v-model="date" class="border rounded px-3 py-2"/>
</section>


<section>
<h2 class="font-medium mb-2">Horários</h2>
<div class="flex gap-2 flex-wrap">
<button v-for="slot in slots" :key="slot.start" @click="book(slot)"
class="px-3 py-2 rounded border hover:bg-gray-50">
{{ new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
</button>
<div v-if="!slots.length" class="text-sm opacity-70">Sem horários disponíveis.</div>
</div>
</section>

<section>
    <input v-model="customerName" placeholder="" type="text" class="px-3 py-2 border b-rder-black rounded-[0.5rem]">
</section>
</div>
</template>