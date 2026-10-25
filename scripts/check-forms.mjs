// Inspect generated static output; never submit forms or contact an external service.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parse } from '@vue/compiler-dom'
const enabled = process.argv[2] === 'enabled'
const html = readFileSync('dist/contact/index.html', 'utf8')
const tree = parse(html)
const nodes = []
function walk(node) { if (node.type === 1) nodes.push(node); for (const child of node.children || []) walk(child) }
walk(tree)
const attr = (node, name) => node.props.find(prop => prop.name === name)?.value?.content
const forms = nodes.filter(node => node.tag === 'form')
assert.equal(forms.length, enabled ? 2 : 0)
if (enabled) {
  for (const [index, name] of ['leslie-contact', 'leslie-blog-updates'].entries()) {
    const form = forms[index]
    assert.equal(attr(form, 'name'), name)
    assert.equal(attr(form, 'method'), 'POST')
    assert.equal(attr(form, 'data-netlify'), 'true')
    assert.equal(attr(form, 'action'), '/request-received/')
    assert.equal(attr(form, 'netlify-honeypot'), 'bot-field')
    const inputs = form.children.filter(node => node.tag === 'input')
    assert(inputs.some(node => attr(node, 'name') === 'form-name' && attr(node, 'value') === name))
    assert(inputs.some(node => attr(node, 'name') === 'email' && attr(node, 'type') === 'email'))
  }
  assert(!nodes.some(node => attr(node, 'type') === 'file'))
  assert(html.includes('Records Request'))
  assert(html.includes('not a secure clinical messaging service'))
  assert(html.includes('does not automatically enroll you'))
  assert(nodes.some(node => node.tag === 'textarea' && attr(node, 'maxlength') === '1000'))
  const ids = nodes.map(node => attr(node, 'id')).filter(Boolean)
  assert.equal(new Set(ids).size, ids.length)
  for (const label of nodes.filter(node => node.tag === 'label' && attr(node, 'for'))) assert(ids.includes(attr(label, 'for')))
} else {
  assert(html.includes('Online inquiries are unavailable.'))
  assert(!html.includes('data-netlify='))
}
const confirmation = readFileSync('dist/request-received/index.html', 'utf8')
assert.equal(confirmation.includes('Your request has been submitted.'), enabled)
for (const route of ['privacy-policy', '1892-2']) {
  const policy = readFileSync(`dist/${route}/index.html`, 'utf8')
  assert(policy.includes('Last Updated on October 24, 2026.'))
  assert(policy.includes('Netlify processes and stores these submissions'))
}
console.log(`PASS: generated forms ${enabled ? 'enabled locally' : 'disabled by default'}, confirmation and both privacy disclosures; no submissions sent.`)
