<script setup>
import { navigation } from '~/data/site'
const route = useRoute()
const open = ref(false)
const menuButton = ref(null)
watch(() => route.fullPath, () => { open.value = false })
function closeMenu() {
  if (open.value) { open.value = false; menuButton.value?.focus() }
}
const active = path => path === '/' ? route.path === '/' : route.path.startsWith(path)
</script>
<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="shell header-inner">
      <NuxtLink class="wordmark" to="/" aria-label="Leslie Tourish Psychotherapy, Home">
        <span>Leslie Tourish</span><span class="wordmark-subtitle">Psychotherapy</span>
      </NuxtLink>
      <button ref="menuButton" class="menu-toggle" type="button" :aria-expanded="open" aria-controls="site-navigation" @click="open = !open">
        {{ open ? 'Close' : 'Menu' }} <span aria-hidden="true">{{ open ? '−' : '+' }}</span>
      </button>
      <nav id="site-navigation" class="site-navigation" :class="{ 'is-open': open }" aria-label="Main navigation">
        <ul>
          <li v-for="item in navigation" :key="item.path" :class="{ 'nav-parent': item.children }">
            <NuxtLink :to="item.path" :class="{ 'is-active': active(item.path) }" :aria-current="route.path === item.path ? 'page' : undefined">{{ item.title }}</NuxtLink>
            <ul v-if="item.children" class="nav-children" aria-label="Mental Health Resources pages">
              <li v-for="child in item.children" :key="child.path"><NuxtLink :to="child.path" :aria-current="route.path === child.path ? 'page' : undefined">{{ child.title }}</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
