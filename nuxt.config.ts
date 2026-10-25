// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },
  experimental: { appManifest: false },
  modules: ["./modules/practice-content"],
  // The existing project intentionally uses root-level pages/layouts.
  srcDir: ".",
  ssr: true,
  nitro: { preset: 'netlify-static' },
  routeRules: {
    '/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
    '/mental-health-resources/frequently-asked-therapy-questions': { redirect: { to: '/mental-health-resources/#faq', statusCode: 301 } },
    '/mental-health-resources/frequently-asked-therapy-questions/': { redirect: { to: '/mental-health-resources/#faq', statusCode: 301 } },
    '/home': { redirect: { to: '/', statusCode: 301 } },
    '/home/': { redirect: { to: '/', statusCode: 301 } },
  },
  compatibilityDate: "2024-12-18",
});
