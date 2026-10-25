# Contact and blog-update requests: activation pending

Recipient confirmed by the owner: leslie@leslietourish.com. This document records configuration intent, not successful delivery.

`LESLIE_ENABLE_FORMS` defaults off. The build-time app configuration only renders Netlify forms when this variable is exactly `true`. Without it, Contact retains the existing phone/email fallback and the confirmation route does not claim a submission occurred. No credentials, mail library, function or external mailing-list integration is added.

Two proposed forms: `leslie-contact` (name, email, optional phone, New Client/Records Request/Other reason and short message capped at 1,000 characters) and `leslie-blog-updates` (name/email for manual handling). Both use POST, a honeypot, native validation, accessible labels, no uploads and `/request-received/` as the confirmation route. An `email` field supports Netlify's Reply-To behavior. No automatic enrollment or visitor confirmation email is configured. Contact explains not to send sensitive health information or urgent requests. Records Request source wording is unchanged; its dropdown reference can work only after activation.

## Exact remaining verification and approval

1. With separately granted read-only Netlify UI access, confirm the `leslie-tourish` project and its actual team plan under Usage & billing; inspect Forms > Usage, Form detection, and existing Submission notifications without viewing private submissions. Chrome UI verified getsupporttogether Free credit-based plan on October 24 local / October 25 UTC, with 1.4 of 300 credits remaining and no saved payment method. Forms are free/unlimited per current Netlify docs; no upgrade or purchase authorized. Current official docs state Forms are free/unlimited on credit-based plans; legacy plans have limits and may automatically upgrade paid usage. Do not change the plan or purchase credits.
2. Obtain bundled approval to enable Forms detection if needed, set `LESLIE_ENABLE_FORMS=true` for the approved deploy-preview build context initially, deploy the reviewed form code, configure email notifications for these two specific forms to leslie@leslietourish.com, and send one clearly labelled synthetic test for each form. Do not enable the production context or change domain/DNS as part of preview testing.
3. After deployment, verify Netlify detected both names and their fields. Under Forms > Submission notifications, add/verify the confirmed email destination for each form. Keep notification subjects generic (for example, Website contact request / Blog-update request); never put message text into a subject. Do not configure webhooks or extra recipients.
4. Only after approval, use fictitious test content with no health/client data, then ask Leslie to confirm receipt and Reply-To behavior for both notifications. Verify required-field handling, confirmation route and spam filtering; a successful HTTP response alone is not proof of email delivery. No tests have been submitted yet.
5. Agree on access and deletion practices: Netlify stores submission data in addition to email delivery. No retention duration or clinical-message security assurance has been established. Existing broad privacy security claims remain an owner-review item; do not silently rewrite them.

## Local checks

Generate with `LESLIE_ENABLE_FORMS=true npm run generate`, then `node scripts/check-forms.mjs enabled`. This produces only local files; it does not activate Netlify or send requests. Rebuild without the variable and run `node scripts/check-forms.mjs disabled` before handoff. Existing source-preservation and route tests remain required. No live submissions are part of these checks.

Official references checked 2026-10-25 UTC:
- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/notifications/
- https://docs.netlify.com/manage/forms/submissions/
- https://docs.netlify.com/manage/forms/usage-and-billing/
- https://docs.netlify.com/manage/forms/spam-filters/

Owner approved preview-only activation, notifications to the confirmed recipient and exactly one labeled synthetic test per form. netlify.toml enables the build flag only for Deploy Previews; production default remains off. Delivery acceptance and inbox receipt must be recorded separately.
