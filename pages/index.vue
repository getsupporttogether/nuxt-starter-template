<script setup>
import { documents } from '#build/practice-content.mjs'
usePageMetadata(documents.find(page => page.path === '/'))
const links = [
  { title: 'About', path: '/about/', number: '01' },
  { title: 'Services', path: '/services/', number: '02' },
  { title: 'Mental Health Resources', path: '/mental-health-resources/', number: '03' },
  { title: 'Blog', path: '/blog/', number: '04' },
]
</script>
<template>
  <main id="main-content" tabindex="-1">
    <section class="home-intro shell" aria-labelledby="home-title">
      <div class="home-intro-copy">
        <p class="eyebrow">Home <span aria-hidden="true">/</span> A new chapter</p>
        <h1 id="home-title">Leslie Tourish<br><em>Psychotherapy</em></h1>
        <div class="gold-rule" aria-hidden="true" />
        <p class="intro">A new website, thoughtfully taking shape.</p>
        <p class="muted">This is a design preview. Home page content is awaiting migration from the existing website.</p>
        <NuxtLink class="text-link" to="/about/">About <span aria-hidden="true">↗</span></NuxtLink>
      </div>
      <div class="image-placeholder" role="img" aria-label="Placeholder for approved photography; no image has been selected">
        <div class="image-placeholder-inner">
          <span class="eyebrow">Imagery to follow</span>
          <span class="image-placeholder-title">Room for<br><em>the next chapter.</em></span>
          <span class="image-placeholder-caption">Approved photography placeholder</span>
        </div>
      </div>
    </section>
    <section class="home-directory" aria-labelledby="explore-title">
      <div class="shell directory-layout">
        <div><p class="eyebrow">Find your way</p><h2 id="explore-title">Explore<br><em>the website.</em></h2><p class="muted">Familiar pages, a fresh foundation.<br>Original content is awaiting migration.</p></div>
        <div class="directory-links">
          <NuxtLink v-for="link in links" :key="link.path" :to="link.path" class="directory-link"><span class="directory-number">{{ link.number }}</span><span>{{ link.title }}</span><span class="directory-arrow" aria-hidden="true">↗</span></NuxtLink>
        </div>
      </div>
    </section>
    <section class="shell home-note" aria-label="Preview status">
      <p class="eyebrow">Phase 1 preview</p><p>The page structure is ready for original content. Practice details, photography, and the approved logo are still to come.</p>
      <NuxtLink class="text-link" to="/contact/">Contact <span aria-hidden="true">↗</span></NuxtLink>
    </section>
  </main>
</template>
