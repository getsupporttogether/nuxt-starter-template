<script setup>
import { navigation } from '~/data/site'
</script>
<template>
  <footer class="site-footer">
    <div class="shell footer-main">
      <div>
        <NuxtLink class="wordmark footer-wordmark" to="/">Leslie Tourish<span class="wordmark-subtitle">Psychotherapy</span></NuxtLink>
        <p class="footer-note">A website in progress.<br>Original content and approved branding to follow.</p>
      </div>
      <nav aria-label="Footer navigation">
        <p class="eyebrow">Explore</p>
        <ul class="footer-links">
          <li v-for="item in navigation" :key="item.path"><NuxtLink :to="item.path">{{ item.title }}</NuxtLink></li>
          <li><NuxtLink to="/mental-health-resources/frequently-asked-therapy-questions/">Frequently Asked Questions</NuxtLink></li>
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
