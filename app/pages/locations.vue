<script setup lang="ts">

const services:any = [
{name:'Barbearia 01', link:'/barber', desc:'Rua Duque de caixas, numero 20'},


]
</script>


<template>
 <div class="flex justify-center items-center h-screen w-full">
     <div class="grid gap-3  grid-cols-1 sm:grid-cols-3 ">
     <NuxtLink class="border hover:border-purple-400 p-4 text-black w-80 h-40 " v-for="service in services" :to="service.link"><div>
        <div class="flex flex-col "><span class="flex justify-between">{{ service.name }} <Icon class="text-[24px]" name="mingcute:hair-fill"  /></span>     </div>
  <div class="mt-18 text-gray-400">{{ service.desc }}</div>   </div></NuxtLink>
     </div>
 </div>

</template>

<style>

</style>