// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: true },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },

  runtimeConfig: {
    authSecret: "algumasecretbemlonga",
    databaseUrl: ".data/app.db",
  },

  typescript: { strict: true },
  modules: ["@nuxt/icon", "@pinia/nuxt", "@sidebase/nuxt-auth"],
  auth: {
    isEnabled: true,

    baseURL: process.env.NUXT_PUBLIC_AUTH_BASE_URL,
    originEnvKey: "NUXT_PUBLIC_AUTH_BASE_URL",
    provider: { type: "authjs", trustHost: true, addDefaultCallbackUrl: true },
    disableServerSideAuth: true,
    sessionRefresh: { enableOnWindowFocus: false, enablePeriodically: false },
  },
});
