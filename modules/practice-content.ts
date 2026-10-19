import { defineNuxtModule, addTemplate } from '@nuxt/kit'
import { loadContent } from '../scripts/content.mjs'

export default defineNuxtModule({
  meta: { name: 'practice-content' },
  setup(_options, nuxt) {
    const content = loadContent(nuxt.options.rootDir)
    addTemplate({
      filename: 'practice-content.mjs',
      getContents: () => {
        const current = loadContent(nuxt.options.rootDir)
        return `export const documents = ${JSON.stringify(current.documents)};\nexport const archives = ${JSON.stringify(current.archives)};\n`
      },
      write: true,
    })
    nuxt.options.nitro.prerender ||= {}
    nuxt.options.nitro.prerender.routes = content.routes
    nuxt.options.nitro.prerender.failOnError = true
    nuxt.options.nitro.prerender.crawlLinks = false
    // Markdown is read only when preparing/generating the website, never at runtime.
    nuxt.hook('builder:watch', async (_event, path) => {
      if (path.startsWith('content/')) await nuxt.callHook('builder:generateApp')
    })
  },
})
