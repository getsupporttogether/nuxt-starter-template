<script setup>
defineProps({ error: Object })
useSeoMeta({ title: 'Page unavailable | Leslie Tourish Psychotherapy', robots: 'noindex, nofollow' })
</script>
<template>
  <NuxtLayout>
    <main id="main-content" class="shell error-page" tabindex="-1">
      <p class="eyebrow">{{ error?.statusCode || 'Error' }}</p>
      <h1>{{ error?.statusCode === 404 ? 'Page not found.' : 'This page is unavailable.' }}</h1>
      <p>Return to Home or explore the existing pages using the navigation.</p>
      <a class="text-link" href="/">Return to Home <span aria-hidden="true">↗</span></a>
    </main>
  </NuxtLayout>
</template>
