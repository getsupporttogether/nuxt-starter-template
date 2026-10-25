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
  <SampleArticleTemplate v-else-if="page.kind === 'post' && page.sourceId === 649" :article="page" />
  <ArticleTemplate v-else-if="page.kind === 'post'" :article="page" />
  <PageTemplate v-else :page="page">
    <section v-if="page.path === '/contact/'" class="inactive-contact" aria-labelledby="contact-preview-title">
      <h2 id="contact-preview-title">Contact form placeholder</h2>
      <p>The contact form is not active. Its fields, privacy wording, and processing service require approval before implementation.</p>
      <p class="contact-status"><span aria-hidden="true">●</span> No inquiries can be sent or stored through this preview.</p>
    </section>
    <section v-if="page.path === '/mental-health-resources/'" id="faq" class="prose resource-child" aria-labelledby="combined-faq-title">
      <h2 id="combined-faq-title">Frequently Asked Questions</h2>
      <div v-html="faq.html" />
    </section>
  </PageTemplate>
</template>
