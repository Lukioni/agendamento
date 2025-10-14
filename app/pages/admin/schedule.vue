<script setup lang="ts">
const bookings = ref<any[]>([]);
const rangeStart = ref(new Date());


async function load() {
bookings.value = await $fetch('/api/bookings');
}


onMounted(load);


function byDay(d: number) {
return bookings.value.filter(b => new Date(b.startISO).getDay() === d);
}


function fmt(t: string) {
const d = new Date(t);
return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
</script>


<template>
<div class="max-w-6xl mx-auto p-6">
<h1 class="text-2xl font-semibold mb-6">Agendamentos (semana)</h1>
<div class="grid sm:grid-cols-7 gap-4">
<div v-for="d in 7" :key="d" class="border rounded p-2">
<div class="font-medium mb-2">{{ ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d-1] }}</div>
<div class="space-y-2">
<div v-for="b in byDay(d-1)" :key="b.id" class="border rounded p-2">
<div class="text-sm">#{{ b.id }} • {{ fmt(b.startISO) }}–{{ fmt(b.endISO) }}</div>
<div class="text-xs opacity-70">Prof.: {{ b.staffId }} • Serviço: {{ b.serviceId }}</div>
</div>
</div>
</div>
</div>
</div>
</template>