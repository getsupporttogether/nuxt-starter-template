<script setup>
import { documents, archives } from '#build/practice-content.mjs'
const props = defineProps({ article: { type: Object, required: true } })
const posts = documents.filter(item => item.kind === 'post').sort((a, b) => b.published.localeCompare(a.published))
const recentPosts = posts.filter(item => item.path !== props.article.path).slice(0, 4)
const categories = archives.filter(item => item.type === 'category' && item.page === 1)
const tags = props.article.tags.filter(tag => archives.some(item => item.path === `/tag/${tag.slug}/`))
const formatDate = value => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value))
</script>
<template>
  <main id="main-content" tabindex="-1" class="sample-article">
    <article class="shell">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span><NuxtLink to="/blog/">Blog</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Article</span></nav>
      <header class="sample-hero">
        <!-- Reserved image layer: replace only with the user's approved hero asset. -->
        <div class="sample-hero-image" aria-hidden="true" />
        <div class="sample-hero-copy">
          <p class="eyebrow">From the blog</p>
          <h1>{{ article.title }}</h1>
          <p><time :datetime="article.published">{{ formatDate(article.published) }}</time></p>
          <p class="sample-asset-note">Hero photograph to be supplied</p>
        </div>
      </header>
      <div class="sample-columns">
        <div class="sample-copy prose" v-html="article.html" />
        <aside class="sample-sidebar" aria-label="Explore the blog">
          <section aria-labelledby="sample-categories">
            <h2 id="sample-categories">Categories</h2>
            <ul><li v-for="category in categories" :key="category.path"><NuxtLink :to="category.path">{{ category.title }}</NuxtLink></li></ul>
          </section>
          <section aria-labelledby="sample-tags">
            <h2 id="sample-tags">Tags</h2>
            <ul class="sample-tags"><li v-for="tag in tags" :key="tag.slug"><NuxtLink :to="`/tag/${tag.slug}/`">{{ tag.title }}</NuxtLink></li></ul>
          </section>
          <section aria-labelledby="sample-recent">
            <h2 id="sample-recent">Recent articles</h2>
            <ul class="sample-recent"><li v-for="post in recentPosts" :key="post.path">
              <NuxtLink v-if="!post.placeholder" :to="post.path">{{ post.title }}</NuxtLink><span v-else>{{ post.title }}</span>
              <time :datetime="post.published">{{ formatDate(post.published) }}</time>
              <small v-if="post.placeholder">Article migration pending</small>
            </li></ul>
          </section>
          <NuxtLink class="sample-more" to="/blog/">Read more articles <span aria-hidden="true">→</span></NuxtLink>
        </aside>
      </div>
      <div class="sample-closer">
        <img src="/images/blog/bluebonnet-closer.png" alt="" width="423" height="733" loading="lazy" decoding="async">
      </div>
    </article>
  </main>
</template>
<style scoped>
.sample-article { padding-block: 38px 64px; font-family: var(--body); }
.sample-hero { position: relative; min-height: 360px; height: clamp(360px, 35vw, 480px); isolation: isolate; display: grid; align-items: center; margin-block: 28px 56px; border: 4px solid #C89B55; background: #27211e; color: var(--linen); }
.sample-hero-image { position: absolute; inset: 0; z-index: -2; background-position: center; background-size: cover; }
.sample-hero::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, #27211ef2, #27211eb3); }
.sample-hero-copy { padding: clamp(24px, 5vw, 64px); max-width: 900px; }
.sample-hero h1 { color: #8897B3; font-family: var(--display); font-size: clamp(2.25rem, 4.7vw, 4.5rem); margin-block: 16px 24px; }
.sample-asset-note { font-size: .8rem; margin-top: 14px; }
.sample-columns { display: grid; grid-template-columns: minmax(0, 2.2fr) minmax(260px, 1fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
.sample-copy { min-width: 0; }
.sample-sidebar { min-width: 0; border-left: 1px solid var(--line); padding-left: 28px; }
.sample-sidebar section + section { margin-top: 30px; }
.sample-sidebar h2, .sample-copy :deep(:is(h2,h3,h4,h5,h6)) { color: #8897B3; background: #27211e; padding: 12px 16px; font-family: var(--display); font-size: 1.6rem; line-height: 1.3; letter-spacing: 0; }
.sample-sidebar ul { list-style: none; padding: 0; margin: 16px 0 0; }
.sample-sidebar li { margin-bottom: 8px; overflow-wrap: anywhere; }
.sample-sidebar a { display: inline-block; padding-block: 8px; }
.sample-tags { display: flex; flex-wrap: wrap; gap: 6px 14px; }
.sample-recent li { padding-block: 12px; border-bottom: 1px solid var(--line); }
.sample-recent time, .sample-recent small { display: block; font-size: .8rem; margin-top: 6px; }
.sample-more { display: flex !important; justify-content: space-between; gap: 12px; margin-top: 28px; padding: 14px 18px !important; background: var(--cocoa); color: var(--linen); text-decoration: none; border: 2px solid #C89B55; }
.sample-copy :deep(img), .sample-copy :deep([data-photo-pending]) { border: 4px solid #C89B55; padding: 12px; }
.sample-copy :deep(blockquote) { border: 2px solid #C89B55; border-left-width: 6px; padding: 24px; margin: 28px 0; background: #C89B551a; }
.sample-closer { min-height: 140px; display: grid; place-items: center; margin-top: 60px; padding: 24px; border-block: 2px solid #C89B55; text-align: center; font-size: .9rem; }
.sample-closer img { display: block; width: clamp(120px, 18vw, 180px); max-width: 100%; height: auto; border: 2px solid #C89B55; }
@media (max-width: 800px) {
  .sample-columns { grid-template-columns: minmax(0,1fr); }
  .sample-sidebar { border-left: 0; padding-left: 0; padding-top: 32px; border-top: 1px solid var(--line); }
  .sample-hero { margin-bottom: 36px; }
}
</style>
