<script setup lang="ts">

const services:any = [
{name:'Barbearia', link:'/barber', desc:'Cabelo cabelo cabelo cabelo cabelo'},

{name:'Barbearia', link:'/barber', desc:'Cabelo cabelo cabelo cabelo cabelo'},
{name:'Barbearia', link:'/barber', desc:'Cabelo cabelo cabelo cabelo cabelo'},
]
</script>


<template>
 <div class="flex justify-center items-center h-screen w-full">
     <div class="grid gap-3  grid-cols-3 ">
     <NuxtLink class="bg-gray-400 p-4 text-white w-80 h-40 " v-for="service in services" :to="service.link"><div>
        <div class="flex flex-col "><span class="flex justify-between">{{ service.name }} <Icon class="text-[24px]" name="mingcute:hair-fill"  /></span>     </div>
  <div class="mt-18">{{ service.desc }}</div>   </div></NuxtLink>
     </div>
 </div>

</template>

<style>

</style>