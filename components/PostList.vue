<script setup>
defineProps({ posts: { type: Array, required: true } })
const date = value => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value))
</script>
<template>
  <ol class="post-list">
    <li v-for="post in posts" :key="post.path" class="post-entry">
      <div class="post-meta"><time :datetime="post.published">{{ date(post.published) }}</time></div>
      <h2><NuxtLink :to="post.path">{{ post.title }}<span aria-hidden="true"> ↗</span></NuxtLink></h2>
      <p>Original article title and URL retained. The article body has not yet been imported.</p>
    </li>
  </ol>
</template>
