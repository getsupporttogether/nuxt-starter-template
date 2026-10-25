<template>
  <section class="blog-closing" aria-label="About Leslie Tourish">
    <div class="shell blog-closing-inner">
      <img class="blog-closing-portrait" src="/images/blog/leslie-headshot.jpg" alt="Leslie Tourish" width="1427" height="1760" loading="lazy" decoding="async">
      <div class="blog-closing-copy">
        <img class="blog-closing-signature" src="/images/blog/leslie-signature.svg" alt="Leslie Tourish" width="843" height="174" loading="lazy" decoding="async">
        <p><em>Leslie Tourish, LPC, is a Dripping Springs psychotherapist specializing in resilience. Serving Dripping Springs, Driftwood, Oak Hill, Wimberley, and other Texas hill country communities.</em></p>
        <p><a href="tel:+15126951660">(512) 695-1660</a></p>
      </div>
    </div>
  </section>
</template>
<style scoped>
.blog-closing { width: 100%; margin-top: 40px; padding-block: 40px; background: #8897B3; color: #F7F3EB; font-family: var(--body); }
.blog-closing-inner { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 32px; align-items: center; }
.blog-closing-portrait { display: block; width: 150px; max-width: 100%; height: auto; border: 3px solid #C89B55; }
.blog-closing-copy { max-width: 760px; min-width: 0; }
.blog-closing-signature { display: block; width: min(100%, 420px); height: auto; margin-bottom: 20px; }
.blog-closing-copy p + p { margin-top: 12px; }
.blog-closing-copy a { display: inline-block; padding-block: 8px; }
@media (max-width: 600px) {
  .blog-closing-inner { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .blog-closing-portrait { width: 120px; }
}
</style>
