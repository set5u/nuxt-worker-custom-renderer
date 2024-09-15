// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      isCustomElement: (s) => s === "custom-renderer-element",
    },
  },
  ssr: false,
});
