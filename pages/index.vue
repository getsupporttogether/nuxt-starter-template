<script setup>
import { documents } from '#build/practice-content.mjs'
import { homeSections } from '../scripts/homepage.mjs'
const page = documents.find(page => page.path === '/')
usePageMetadata(page)
const home = homeSections(page.html)
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
        <p class="eyebrow">Home</p>
        <h1 id="home-title">Leslie Tourish<br><em>Psychotherapy</em></h1>
        <div class="gold-rule" aria-hidden="true" />
        <p v-if="home.introduction" class="intro" v-html="home.introduction" />
        <NuxtLink class="text-link" to="/about/">About <span aria-hidden="true">↗</span></NuxtLink>
      </div>
      <div v-if="home.image" class="image-placeholder home-photo" v-html="home.image" />
      <div v-else class="image-placeholder" role="img" aria-label="Placeholder for approved photography; no image has been selected">
        <div class="image-placeholder-inner">
          <span class="eyebrow">Imagery to follow</span>
          <span class="image-placeholder-title">Room for<br><em>the next chapter.</em></span>
          <span class="image-placeholder-caption">Approved photography placeholder</span>
        </div>
      </div>
    </section>
    <section class="shell home-copy" aria-label="Therapy with Leslie Tourish">
      <div class="reading-column prose" v-html="home.body" />
    </section>
    <section class="home-directory" aria-labelledby="explore-title">
      <div class="shell directory-layout">
        <div><p class="eyebrow">Find your way</p><h2 id="explore-title">Explore<br><em>the website.</em></h2></div>
        <div class="directory-links">
          <NuxtLink v-for="link in links" :key="link.path" :to="link.path" class="directory-link"><span class="directory-number">{{ link.number }}</span><span>{{ link.title }}</span><span class="directory-arrow" aria-hidden="true">↗</span></NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-photo { align-items: center; }
.home-photo :deep(img) { display: block; width: 100%; height: auto; }
.home-copy { padding-bottom: 70px; }
.home-copy .reading-column { margin-inline: auto; }
.home-copy :deep(img) { max-height: 460px; width: auto; margin-inline: auto; object-fit: contain; }
.home-copy :deep(.home-awards) { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: center; }
.home-copy :deep(.home-awards img) { width: 100%; }
@media (max-width: 700px) {
  .home-copy { padding-bottom: 45px; }
  .home-copy :deep(.home-awards) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
}
</style>
