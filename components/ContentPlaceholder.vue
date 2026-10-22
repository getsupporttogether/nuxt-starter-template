<script setup>
defineProps({ label: { type: String, default: 'Content awaiting migration' } })
</script>
<template>
  <aside class="content-placeholder" aria-label="Content migration status">
    <span class="placeholder-marker" aria-hidden="true" />
    <div><p class="eyebrow">{{ label }}</p><slot><p>This area is reserved for the original website content. No new practice information has been written.</p></slot></div>
  </aside>
</template>
