// Split the compiled, sanitized homepage Markdown into the existing hero and body.
// Keep the full body as a fallback if editors change the opening structure.
export function homeSections(html = '') {
  const opening = html.match(/^<p>(<img\b[^>]*>)<\/p>\s*<h2>([\s\S]*?)<\/h2>\s*/)
  const body = opening ? html.slice(opening[0].length) : html
  return {
    image: opening ? opening[1].replace('loading="lazy"', 'loading="eager" fetchpriority="high"') : '',
    introduction: opening?.[2] || '',
    body: body.replace(/(?:<p><img\b[^>]*\/best_of_dripping_springs[^>]*><\/p>\s*)+/g,
      images => `<div class="home-awards">${images}</div>`),
  }
}
