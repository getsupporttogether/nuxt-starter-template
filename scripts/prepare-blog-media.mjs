// Prepare size-limited web derivatives from already verified source files.
import sharp from 'sharp'
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { createHash } from 'node:crypto'
const file = 'data/blog-media.json'
const data = JSON.parse(readFileSync(file, 'utf8'))
const conversions = new Map()
for (const [oldPath, provenance] of Object.entries(data.files)) {
  if (oldPath.endsWith('.webp')) continue
  const newPath = oldPath.replace(/\.[^.]+$/, '.webp')
  await sharp(`public${oldPath}`).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public${newPath}`)
  conversions.set(oldPath, newPath)
  data.files[newPath] = { ...provenance, output_sha256: createHash('sha256').update(readFileSync(`public${newPath}`)).digest('hex'), handling: 'Proportional web derivative, max1600px, no upscale; source original unchanged.' }
  delete data.files[oldPath]
  unlinkSync(`public${oldPath}`) // Only generated staging copies; never original iCloud assets.
}
for (const post of Object.values(data.posts)) post.hero = conversions.get(post.hero) || post.hero
for (const url of Object.keys(data.sources)) data.sources[url] = conversions.get(data.sources[url]) || data.sources[url]
writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
console.log(`Prepared ${conversions.size} web images`)
