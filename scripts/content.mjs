import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'
import { Marked } from 'marked'

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const safeUrl = href => /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href || '')
const markdown = new Marked({
  // Content is maintained in Git. Raw HTML/embeds are intentionally unsupported.
  renderer: {
    html() { return '' },
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens)
      return safeUrl(href) ? `<a href="${escape(href)}">${text}</a>` : text
    },
    image({ href, text }) {
      if (/^https?:\/\//i.test(href || '')) {
        // Preserve source references in Markdown; photographs are supplied by the owner.
        // Do not hotlink WordPress assets while the replacement photographs are pending.
        return `<span class="article-image-note" data-photo-pending="true" role="img" aria-label="${escape(text || 'Photograph to be supplied')}"><span aria-hidden="true">Photograph to be supplied</span></span>`
      }
      return /^\/(?!\/)/.test(href || '')
        ? `<img src="${escape(href)}" alt="${escape(text)}" loading="lazy" decoding="async">` : escape(text)
    },
  },
})

export function loadContent(root = process.cwd()) {
  const documents = []
  const paths = new Set()
  for (const directory of ['pages', 'posts']) {
    const folder = resolve(root, 'content', directory)
    for (const filename of readdirSync(folder).filter(name => name.endsWith('.md')).sort()) {
      const source = readFileSync(resolve(folder, filename), 'utf8')
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
      if (!match) throw new Error(`Missing frontmatter in ${directory}/${filename}`)
      const meta = parse(match[1])
      if (meta.draft) continue
      if (!/^\/(?:[a-z0-9_-]+\/)*$/.test(meta.path) || paths.has(meta.path)) throw new Error(`Invalid or duplicate content path: ${meta.path}`)
      if (typeof meta.title !== 'string' || !meta.title.trim()) throw new Error(`Missing title: ${filename}`)
      if (!['page', 'post'].includes(meta.kind)) throw new Error(`Invalid kind: ${filename}`)
      if (meta.kind === 'post' && !Number.isFinite(Date.parse(meta.published))) throw new Error(`Missing publication date: ${filename}`)
      for (const key of ['categories', 'tags']) {
        if (!Array.isArray(meta[key])) throw new Error(`Missing ${key}: ${filename}`)
        for (const item of meta[key]) {
          if (!/^[a-z0-9_-]+$/.test(item.slug) || typeof item.title !== 'string') throw new Error(`Invalid ${key}: ${filename}`)
        }
      }
      paths.add(meta.path)
      documents.push({ ...meta, html: markdown.parse(match[2]) })
    }
  }
  const posts = documents.filter(doc => doc.kind === 'post').sort((a, b) => b.published.localeCompare(a.published))
  const archives = []
  function addArchive(base, title, type, entries) {
    const count = Math.ceil(entries.length / 12) || 1
    const pagination = Array.from({ length: count }, (_, index) => ({ number: index + 1, path: index ? `${base}page/${index + 1}/` : base }))
    for (const page of pagination) {
      archives.push({ path: page.path, title: page.number > 1 ? `${title} — Page ${page.number}` : title, type, page: page.number, pagination, posts: entries.slice((page.number - 1) * 12, page.number * 12) })
    }
  }
  addArchive('/blog/', 'Blog', 'blog', posts)
  for (const [key, prefix] of [['categories', 'category'], ['tags', 'tag']]) {
    const terms = new Map(posts.flatMap(post => post[key]).map(term => [term.slug, term.title]))
    for (const [slug, title] of terms) addArchive(`/${prefix}/${slug}/`, title, prefix, posts.filter(post => post[key].some(term => term.slug === slug)))
  }
  // Existing public author archive, retained rather than introducing an author page.
  addArchive('/author/leslietourish071217/', 'Leslie Tourish', 'author', posts)
  const routes = [...new Set([...documents.map(doc => doc.path), ...archives.map(archive => archive.path)])]
  return { documents, posts, archives, routes }
}
