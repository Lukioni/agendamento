<script setup>
const links = [
  {link:'/locations'}
]
</script>

<template>
  <section id="home" class="w-full flex h-screen justify-center pb-8 sm:pb-16  ">


    <div
      class="max-w-[1180px] grid grid-cols-1 md:grid-cols-2 items-center justify-center  mt-4 sm:mt-16 ">
      <div class="max-w-[345px]  sm:max-w-[541px] ps-5 xl:ps-0">
        <h2 class="font-extralight text-[15px] hidden mt-4 mb-4 sm:mt-0 sm:mb-0 sm:text-[22px] text-black leading-tight ">STUDIO ROKZ</h2>
        <h1 class="font-bold leading-tight text-[32px] w-full sm:ms-4 xl:ms-0 text-left sm:text-left sm:text-[62px] text-black mb-2">
         Sua Barbearia do seu Jeito
        </h1>
        <h2 class="text-[15px] sm:text-[26px] mt-6 font-light w-full sm:ms-4 xl:ms-0  text-left sm:text-left text-black  leading-tight">
        Agendamentos e organização de forma customizada para o melhor tipo de serviço
        </h2>
       
        <button class=" mt-8 sm:mt-12 mb-8 sm:mb-0 sm:ms-4 xl:ms-0  bg-black gap-2 flex items-center w-[191px] h-[39px] sm:w-[347px] sm:h-[60px] rounded-[5px] smrounded-2xl justify-center">
     
          <NuxtLink v-for="link in links" class="uppercase text-white text-[15px] sm:text-[24px] font-bold"     target="_blank"
          :to="link.link">EU QUERO</NuxtLink>
        </button>
      </div>
      <img class="px-4 ms:px-0 " src="~/assets/img/barbeiro.png" alt="">
    </div>
  </section>
</template>

<style scoped>
h1,
h2,
p {

}
.logo {
  background: linear-gradient(90deg, #ff4ec4, #3f87f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 1px white;
}
.btn {
  background: linear-gradient(135deg, #ff4ec4, #3f87f5);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}
.btn:hover {
  transform: scale(1.05);
}
.iphone {
  filter: drop-shadow(2px 4px 6px white);
}
@media (max-width: 440px) {

}





</style>
