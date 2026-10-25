<script setup>
import { navigation } from '~/data/site'
</script>
<template>
  <footer class="site-footer">
    <div class="shell footer-main">
      <div>
        <NuxtLink class="wordmark footer-wordmark" to="/" aria-label="Leslie Tourish Psychotherapy, Home"><img class="site-logo" src="/images/brand/leslie-horizontal.png" alt="" width="10417" height="3125" loading="lazy" decoding="async"></NuxtLink>
        <p class="footer-note">A website in progress.<br>Original content and approved branding to follow.</p>
      </div>
      <nav aria-label="Footer navigation">
        <p class="eyebrow">Explore</p>
        <ul class="footer-links">
          <li v-for="item in navigation" :key="item.path"><NuxtLink :to="item.path">{{ item.title }}</NuxtLink></li>
        </ul>
      </nav>
      <div class="footer-status">
        <p class="eyebrow">Preview only</p>
        <p>Contact details await migration.<br>This preview does not collect inquiries.</p>
        <NuxtLink class="text-link" to="/contact/">Contact <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </div>
    <div class="shell footer-bottom">
      <p>Leslie Tourish Psychotherapy <span aria-hidden="true">·</span> Phase 1</p>
      <div><NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink><NuxtLink to="/texas-therapist-mental-health-records/">Records Request</NuxtLink></div>
    </div>
  </footer>
</template>
