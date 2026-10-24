# Content editing and review

This is a Phase 1 preview. WordPress remains the live website. Do not merge or publish this foundation to production, change DNS, or enable a contact service without approval. The deployment system supplies the review deployment; no deployment command is part of this work.

## Existing content

The 10 existing pages and 26 articles are represented by Markdown files in `content/pages` and `content/posts`. The homepage, About, Services, Mental Health Resources, FAQ, and one representative article (As You Think, So You Become) are imported from the counseling WordPress export for local review. The remaining five page bodies and 25 article bodies remain placeholders pending review. Original titles, paths, source IDs, dates, categories, and tags were taken from published-only public listings. Only the selected public source bodies and referenced public contact/footer copy were imported; private feedback, client information, themes, and WordPress visual layouts were excluded. The known title/description issues need editorial approval before correction. `docs/migration-inventory.md` records the Phase 1 route set.

Home retains its custom layout and now renders its compiled Markdown through scripts/homepage.mjs, splitting the opening image/headline into the existing hero and rendering the remaining copy below it. Blog remains a generated list; its Markdown body is not rendered. Other pages use PageTemplate and articles use ArticleTemplate. Resources retains its FAQ child. Both privacy paths remain separate. Existing category, tag, author and pagination paths are generated from the same article metadata. Unknown URLs return 404 rather than becoming public pages.

## Editing through GitHub

1. Open the appropriate `.md` file on a review branch in GitHub and choose Edit.
2. Keep `path` unchanged. Edit Markdown below the second `---` line. Set `placeholder: false` only after approved content has replaced the placeholder.
3. Preserve source publication dates and source IDs. Use valid quoted ISO timestamps. Keep the categories/tags arrays and existing slugs. Change metadata only after editorial review.
4. Put approved images under `public/` and refer to them with an absolute local path, for example `![Meaningful description](/images/approved-photo.jpg)`. Use prepared, optimized assets with appropriate dimensions. Nine source-mapped homepage images have been imported locally; docs/homepage-image-provenance.json records the URLs and hashes. The user is supplying remaining photographs. Remote image references remain in Markdown and docs/content-migration.json; the renderer shows inert photo placeholders rather than loading remote images. Shared-footer imagery and decorative/subscription backgrounds remain deferred.
5. Review the preview before merging. Adding a future article follows the same frontmatter format with a unique approved public path. Hold the other 25 articles until the representative article layout is reviewed. This batch is approved for PR #1 preview review; production publishing remains on hold.

Use `draft: true` to exclude a future draft from all generated routes and indexes. Do not commit sensitive information: a Git draft is still repository content. Markdown supports headings (start body headings at `##`), paragraphs, lists, links, quotes, and images. Raw HTML, scripts, forms, and embeds are disabled. Only local absolute paths, HTTP(S), mailto, tel, and anchor links are rendered. This is public editorial content, not submission storage.

`npm run generate` prepares all public routes as static HTML for Netlify. No runtime content API, CMS, database, or server function is needed. The content compiler lives in `scripts/content.mjs`; the local Nuxt module exposes its build-time output. `node --test tests/content.test.mjs` validates the route/content foundation without building.

## Branding and pending launch work

The six approved colors are CSS variables in `assets/css/main.css`. Cocoa supplies accessible body text; teal/gold/blue are used with appropriate contrast or as decorative accents. The header uses text only, not a generated logo. Mrs Eaves XL and Source Sans 3 are named in font stacks. No fonts are fetched or redistributed; Georgia and the local sans-serif stack are deliberate fallbacks. Supply licensed font delivery (including the actual provider family names) and the approved logo before final visual sign-off.

The preview has robots exclusion, meta noindex and an X-Robots-Tag header. These are indexing controls, not authentication. Remove them only during an approved launch. Public content/SEO descriptions, canonical tags, sitemap/feed, images, confirmation of exported practice details, subscriptions, analytics, and the contact processor remain migration/launch work. Do not copy the existing confidentiality promise into an active form without approval. The current Contact page has no form controls, submission endpoint, storage, or external requests.

## Review checks

Check Home, About, Services, Resources, FAQ, Blog, pagination, a dated article, Contact, both privacy URLs, Records Request, category/tag/author archives, and an unknown path. Check mobile navigation with touch and keyboard, Escape returning focus to Menu, FAQ discovery, skip link, browser back/forward, reduced motion, 200% zoom, and long article titles. The mobile menu is nonmodal; it does not trap focus. With JavaScript disabled, CSS exposes the navigation as a normal list.
