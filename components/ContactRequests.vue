<script setup>
const enabled = useAppConfig().websiteFormsEnabled === true
</script>
<template>
  <div v-if="enabled" class="request-forms">
    <section aria-labelledby="contact-title">
      <h2 id="contact-title">Contact Leslie Tourish</h2>
      <p id="contact-notice">Please do not include sensitive health information, medical records, payment details or urgent requests. This form is not a secure clinical messaging service and should not be used for emergencies.</p>
      <form name="leslie-contact" method="POST" action="/request-received/" data-netlify="true" netlify-honeypot="bot-field" aria-describedby="contact-notice">
        <input type="hidden" name="form-name" value="leslie-contact">
        <p class="form-honeypot" hidden><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <label for="contact-name">Name <span>(required)</span></label>
        <input id="contact-name" name="name" autocomplete="name" maxlength="120" required>
        <label for="contact-email">Email <span>(required)</span></label>
        <input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" required>
        <label for="contact-phone">Phone <span>(optional)</span></label>
        <input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="40">
        <label for="contact-reason">Reason <span>(required)</span></label>
        <select id="contact-reason" name="reason" required>
          <option value="" disabled selected>Select a reason</option>
          <option>New Client</option>
          <option>Records Request</option>
          <option>Other</option>
        </select>
        <label for="contact-message">Short message <span>(required; up to 1,000 characters)</span></label>
        <textarea id="contact-message" name="message" rows="5" maxlength="1000" required />
        <p>Read the <NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink> before submitting.</p>
        <button type="submit">Send request</button>
      </form>
    </section>
    <section aria-labelledby="updates-title">
      <h2 id="updates-title">Request Blog Updates</h2>
      <p id="updates-notice">This sends Leslie a request for manual handling. It does not automatically enroll you in a mailing list.</p>
      <form name="leslie-blog-updates" method="POST" action="/request-received/" data-netlify="true" netlify-honeypot="bot-field" aria-describedby="updates-notice">
        <input type="hidden" name="form-name" value="leslie-blog-updates">
        <p class="form-honeypot" hidden><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <label for="updates-name">Name <span>(required)</span></label>
        <input id="updates-name" name="name" autocomplete="name" maxlength="120" required>
        <label for="updates-email">Email <span>(required)</span></label>
        <input id="updates-email" name="email" type="email" autocomplete="email" maxlength="254" required>
        <p>Read the <NuxtLink to="/privacy-policy/">Privacy Policy</NuxtLink> before submitting.</p>
        <button type="submit">Request blog updates</button>
      </form>
    </section>
  </div>
  <section v-else class="inactive-contact" aria-labelledby="contact-title">
    <h2 id="contact-title">Contact Leslie Tourish</h2>
    <p>Online inquiries are unavailable. Please call <a href="tel:+15126951660">(512) 695-1660</a> or email <a href="mailto:leslie@leslietourish.com">leslie@leslietourish.com</a>.</p>
  </section>
</template>
<style scoped>
.request-forms section { margin-block: 2.5rem; }
h2 { margin-bottom: 1rem; }
form { display: grid; gap: .65rem; margin-top: 1.5rem; }
label { font-weight: 600; }
label span { font-weight: 400; }
input:not([type="hidden"]), select, textarea { width: 100%; min-width: 0; padding: .65rem; border: 1px solid var(--teal); border-radius: 3px; background: var(--page-background); color: var(--body-text); }
textarea { resize: vertical; }
button { justify-self: start; min-height: 44px; padding: .65rem 1rem; border: 1px solid var(--teal); background: var(--teal); color: white; font-weight: 600; }
.form-honeypot { display: none; }
</style>
