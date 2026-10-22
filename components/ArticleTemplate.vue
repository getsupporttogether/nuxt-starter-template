<script setup>
defineProps({ article: { type: Object, required: true } })
const formatDate = value => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value))
</script>
<template>
  <main id="main-content" tabindex="-1" class="article-main">
    <article class="shell">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span><NuxtLink to="/blog/">Blog</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Article</span></nav>
      <header class="article-heading">
        <p class="eyebrow">From the blog</p><h1>{{ article.title }}</h1>
        <p class="article-date"><time :datetime="article.published">{{ formatDate(article.published) }}</time><span aria-hidden="true"> · </span>Original publication date</p>
        <div class="gold-rule" aria-hidden="true" />
      </header>
      <div class="article-body reading-column">
        <ContentPlaceholder v-if="article.placeholder" label="Article awaiting migration" />
        <div class="prose" v-html="article.html" />
        <p class="article-image-note">Article imagery, captions, and alternative text await migration.</p>
        <NuxtLink class="text-link article-back" to="/blog/"><span aria-hidden="true">←</span> Back to Blog</NuxtLink>
      </div>
    </article>
  </main>
</template>
