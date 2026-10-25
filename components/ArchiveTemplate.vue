<script setup>
defineProps({ archive: { type: Object, required: true } })
</script>
<template>
  <main id="main-content" tabindex="-1">
    <header class="page-heading shell">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span><template v-if="archive.path !== '/blog/'"><NuxtLink to="/blog/">Blog</NuxtLink><span aria-hidden="true">/</span></template><span aria-current="page">{{ archive.title }}</span></nav>
      <p class="eyebrow">{{ archive.type === 'blog' ? 'The blog' : 'Blog archive' }}</p>
      <h1>{{ archive.title }}</h1>
      <p class="intro">{{ archive.type === 'blog' ? 'Articles by Leslie Tourish.' : 'Articles by Leslie Tourish.' }}</p>
    </header>
    <div class="shell archive-body">
      <PostList :posts="archive.posts" />
      <nav v-if="archive.pagination.length > 1" class="pagination" aria-label="Article pagination">
        <NuxtLink v-for="page in archive.pagination" :key="page.path" :to="page.path" :aria-current="page.number === archive.page ? 'page' : undefined" :aria-label="`Page ${page.number}`">{{ page.number }}</NuxtLink>
      </nav>
    </div>
  </main>
</template>
