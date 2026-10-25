# Leslie Tourish Psychotherapy — Phase 1

A static-first Nuxt foundation for review. The existing WordPress site, custom domain, and DNS remain unchanged. This is not approved for production.

The shared header/footer, responsive navigation, page/article layouts, and original URL structure are implemented. All 10 published page records and 26 article records use explicit content placeholders. Derived archives retain existing category, tag, author and pagination URLs. No live contact form or submission service is enabled.

## Local review

Use `npm install` to install the project dependencies. Run `netlify dev --port 8889` for local development with Netlify emulation. Run `npm test` for content and route validation. The deployment platform validates the static build automatically; the configured generation command is `npm run generate` and the published directory is `dist`.

All 120 existing routes are enumerated for prerendering; content is read from Markdown only when preparing the site. No runtime database or CMS is needed. Unknown routes return 404. Draft Markdown is excluded. The site has indexing exclusions for the review phase.

See [the migration inventory](docs/migration-inventory.md) and [the publishing and review guide](docs/publishing.md) for editing, scope, licensing, and outstanding approvals. Do not deploy to production or alter DNS without launch approval.
