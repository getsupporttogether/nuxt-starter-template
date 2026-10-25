// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: { head: { link: [{ key: 'mrs-eaves-adobe', rel: 'stylesheet', href: 'https://use.typekit.net/cbj5spq.css' }] } },
  // Keep hosted forms absent until plan/settings and delivery testing are approved.
  appConfig: { websiteFormsEnabled: process.env.LESLIE_ENABLE_FORMS === 'true' },
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
