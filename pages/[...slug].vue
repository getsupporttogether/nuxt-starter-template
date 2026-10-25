<script setup>
import { documents, archives } from '#build/practice-content.mjs'
definePageMeta({ key: route => route.path })
const route = useRoute()
const path = route.path.endsWith('/') ? route.path : `${route.path}/`
const page = documents.find(item => item.path === path)
const faq = documents.find(item => item.sourceId === 1198)
const archive = archives.find(item => item.path === path)
if (!page && !archive) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
usePageMetadata(page || archive)
</script>
<template>
  <ArchiveTemplate v-if="archive" :archive="archive" />
  <SampleArticleTemplate v-else-if="page.kind === 'post'" :article="page" />
  <PageTemplate v-else :page="page">
    <section v-if="page.path === '/contact/'" class="inactive-contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact Leslie Tourish</h2>
      <p>Online inquiries are unavailable. Please call <a href="tel:+15126951660">(512) 695-1660</a>.</p>
    </section>
    <section v-if="page.path === '/mental-health-resources/'" id="faq" class="prose resource-child" aria-labelledby="combined-faq-title">
      <h2 id="combined-faq-title">Frequently Asked Questions</h2>
      <div v-html="faq.html" />
    </section>
  </PageTemplate>
</template>
