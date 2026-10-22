<script setup>
defineProps({ page: { type: Object, required: true } })
</script>
<template>
  <main id="main-content" tabindex="-1">
    <div class="page-heading shell">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span>
        <template v-if="page.path.includes('/mental-health-resources/') && page.path !== '/mental-health-resources/'"><NuxtLink to="/mental-health-resources/">Mental Health Resources</NuxtLink><span aria-hidden="true">/</span></template>
        <span aria-current="page">{{ page.title }}</span>
      </nav>
      <p class="eyebrow">Leslie Tourish Psychotherapy</p>
      <h1>{{ page.title }}</h1><div class="gold-rule" aria-hidden="true" />
    </div>
    <div class="shell page-body-layout">
      <div class="reading-column">
        <ContentPlaceholder v-if="page.placeholder" />
        <div class="prose" v-html="page.html" /><slot />
      </div>
      <aside class="page-aside">
        <p class="eyebrow">In this preview</p><p>Existing page.<br>Original URL.<br>A new visual foundation.</p>
        <NuxtLink v-if="page.path !== '/contact/'" class="text-link" to="/contact/">Contact <span aria-hidden="true">↗</span></NuxtLink>
      </aside>
    </div>
  </main>
</template>
