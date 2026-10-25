<script setup>
const enabled = useAppConfig().websiteFormsEnabled === true
usePageMetadata({ title: 'Request confirmation' })
</script>
<template>
  <main id="main-content" tabindex="-1" class="shell page-heading">
    <h1>{{ enabled ? 'Thank you for your request' : 'Contact Leslie Tourish' }}</h1>
    <p v-if="enabled" class="intro">Your request has been submitted. Blog-update requests are handled manually and do not automatically enroll you in a mailing list.</p>
    <p v-else class="intro">Online inquiries are unavailable. Please call <a href="tel:+15126951660">(512) 695-1660</a> or email <a href="mailto:leslie@leslietourish.com">leslie@leslietourish.com</a>.</p>
    <p><NuxtLink to="/contact/">Return to Contact</NuxtLink></p>
  </main>
</template>
