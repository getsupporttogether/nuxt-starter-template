<script setup>
import { navigation } from '~/data/site'
</script>
<template>
  <footer class="site-footer">
    <div class="shell footer-main">
      <div>
        <NuxtLink class="wordmark footer-wordmark" to="/" aria-label="Leslie Tourish Psychotherapy, Home"><img class="site-logo" src="/images/brand/leslie-horizontal.png" alt="" width="10417" height="3125" loading="lazy" decoding="async"></NuxtLink>
      </div>
      <nav aria-label="Footer navigation">
        <p class="eyebrow">Explore</p>
        <ul class="footer-links">
          <li v-for="item in navigation" :key="item.path"><NuxtLink :to="item.path">{{ item.title }}</NuxtLink></li>
        </ul>
      </nav>
      <div class="footer-status">
        <p class="eyebrow">Contact</p>
        <p><a href="tel:+15126951660">(512) 695-1660</a></p>
        <NuxtLink class="text-link" to="/contact/">Contact <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </div>
    <div class="shell footer-bottom">
      <p>Leslie Tourish Psychotherapy </p>
      <div><NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink><NuxtLink to="/texas-therapist-mental-health-records/">Records Request</NuxtLink></div>
    </div>
  </footer>
</template>
