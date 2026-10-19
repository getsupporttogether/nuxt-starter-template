import test from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadContent } from '../scripts/content.mjs'

test('all approved content and archive URLs are explicitly available for static generation', () => {
  const { documents, posts, archives, routes } = loadContent()
  assert.equal(documents.length, 36)
  assert.equal(posts.length, 26)
  assert.equal(archives.length, 85)
  assert.equal(routes.length, 120)
  for (const path of ['/', '/about/', '/services/', '/blog/', '/blog/page/3/', '/contact/', '/privacy-policy/', '/1892-2/', '/texas-therapist-mental-health-records/', '/mental-health-resources/', '/mental-health-resources/frequently-asked-therapy-questions/', '/author/leslietourish071217/page/3/', '/category/mental-health/page/2/', '/tag/therapy/page/2/', '/tag/mental-health/page/2/', '/2023/07/22/7_easy_steps_to_hypnotize_away_stress/', '/2026/01/20/dont-let-the-pessimists-diim-your-light-protecting-your-optimism-in-the-new-year/']) assert.ok(routes.includes(path), path)
  assert.ok(!routes.includes('/what-to-expect/'))
  assert.ok(!routes.includes('/psychotherapy-services/'))
  assert.ok(!routes.includes('/not-a-real-page/'))
  assert.ok(documents.every(doc => doc.placeholder === true))
  // Distinct articles must survive the source's duplicated title.
  assert.equal(posts.filter(post => post.title === 'The Myth of the “Perfect Therapist”').length, 2)
})

test('drafts are excluded and Markdown cannot create active forms or script links', () => {
  const root = mkdtempSync(join(tmpdir(), 'leslie-content-'))
  try {
    cpSync('content', join(root, 'content'), { recursive: true })
    const sample = readFileSync('content/pages/about.md', 'utf8')
    writeFileSync(join(root, 'content/pages/about.md'), sample + '\n<script>alert(1)</script>\n\n<form action="/collect"><input name="private"></form>\n\n[Unsafe](javascript:alert%281%29)\n\n[Safe](/contact/)\n')
    writeFileSync(join(root, 'content/pages/draft.md'), sample.replace('path: "/about/"', 'path: "/draft-only/"') .replace('placeholder: true', 'placeholder: true\ndraft: true'))
    const result = loadContent(root)
    assert.ok(!result.routes.includes('/draft-only/'))
    const html = result.documents.find(doc => doc.path === '/about/').html
    assert.doesNotMatch(html, /<script|<form|<input|javascript:/i)
    assert.match(html, /href="\/contact\/"/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('duplicate paths fail before producing ambiguous public routes', () => {
  const root = mkdtempSync(join(tmpdir(), 'leslie-content-'))
  try {
    cpSync('content', join(root, 'content'), { recursive: true })
    cpSync('content/pages/about.md', join(root, 'content/pages/duplicate.md'))
    assert.throws(() => loadContent(root), /duplicate content path/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})
