// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
 devtools: { enabled: true },
 icon: {
    mode: 'css',
    cssLayer: 'base'
  },
 css: ['~/assets/css/main.css'],
 vite: {    plugins: [      tailwindcss(),    ],  },

 runtimeConfig: {
 databaseUrl: process.env.DATABASE_URL || '.data/app.db',
 },

 typescript: { strict: true },
 modules: ['@nuxt/icon'],
});