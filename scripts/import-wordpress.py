"""Import only the approved review batch; never ingest feedback or other posts.

Usage: python3 scripts/import-wordpress.py /path/to/counseling-export.xml
Home, four core pages and one representative article only. No bulk import.
The export itself is never copied into the repo.
"""
from pathlib import Path
from html.parser import HTMLParser
from html import escape, unescape
from urllib.parse import urlsplit
import hashlib, json, re, sys, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = {'w': 'http://wordpress.org/export/1.2/', 'c': 'http://purl.org/rss/1.0/modules/content/'}
HOSTS = {'leslietourish.com', 'www.leslietourish.com', 'leslietourishcom.wordpress.com'}
SELECTED = {'84', '1', '47', '1253', '1198', '649'}

class Node:
    def __init__(self, tag='', attrs=(), children=None):
        self.tag, self.attrs, self.children = tag, dict(attrs), children or []

class DOM(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node(); self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs); self.stack[-1].children.append(n)
        if tag not in {'img', 'br', 'hr', 'input', 'meta', 'link', 'wbr', 'source'}: self.stack.append(n)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag: self.stack.pop()
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; break
    def handle_data(self, data): self.stack[-1].children.append(data)

def plain(n):
    if isinstance(n, str): return n
    s = ''.join(plain(c) for c in n.children)
    return (' ' + s + ' ') if n.tag in {'p','div','figure','li','ul','ol','blockquote','br','h1','h2','h3','h4','h5','h6'} else s

def normalized(s): return ' '.join(s.split())
def literal(s):
    s = re.sub(r'([\\`*\[\]])', r'\\\1', s)
    return re.sub(r'(?m)^(\s*)([#>+-]|\d+[.)])(?=\s)', r'\1\\\2', s)

def main(source):
    channel = ET.parse(source).getroot().find('channel')
    assert channel.findtext('link') == 'https://leslietourish.com', 'Wrong site export'
    items = channel.findall('item')
    public = {i.findtext('w:post_id', namespaces=NS): i for i in items
              if i.findtext('w:post_type', namespaces=NS) in {'page', 'post'}
              and i.findtext('w:status', namespaces=NS) == 'publish'}
    blocks = {i.findtext('w:post_id', namespaces=NS): i for i in items
              if i.findtext('w:post_type', namespaces=NS) == 'wp_block'
              and i.findtext('w:status', namespaces=NS) == 'publish'}
    records = []
    for folder in ['pages', 'posts']:
        for path in sorted((ROOT/'content'/folder).glob('*.md')):
            raw = path.read_text(); front = raw.split('---', 2)[1]
            ident = re.search(r'^sourceId: (\d+)', front, re.M).group(1)
            route = json.loads(re.search(r'^path: (.+)', front, re.M).group(1))
            assert ident in public, 'Missing published source '+ident
            records.append((path, ident, route, front))
    assert len(records) == len(public) == 36
    routes = {route for _, _, route, _ in records}
    url_map = {urlsplit(public[i].findtext('link')).path: route for _, i, route, _ in records}
    report = {'source_sha256': hashlib.sha256(Path(source).read_bytes()).hexdigest(),
              'records': [], 'images': [], 'dynamic_blocks': [], 'link_changes': [],
              'unresolved_links': [], 'source_url_map': [], 'editorial': [],
              'excluded_types': sorted({i.findtext('w:post_type', namespaces=NS) for i in items} - {'page','post','wp_block'})}
    expectations = {}
    existing_images = {i['source_url']: i['target_local_asset'] for i in json.loads((ROOT/'docs/homepage-image-provenance.json').read_text())['images'] if i.get('status') == 'downloaded'}
    for path, ident, route, front in records:
        if ident not in SELECTED: continue
        item = public[ident]
        report['source_url_map'].append({'sourceId': int(ident), 'old_url': item.findtext('link'), 'target': route,
                                        'action': 'preserve' if urlsplit(item.findtext('link')).path == route else 'redirect'})
        title = json.loads(re.search(r'^title: (.+)', front, re.M).group(1))
        if title != (item.findtext('title') or ''):
            report['editorial'].append({'sourceId': int(ident), 'source_title': item.findtext('title') or '', 'retained_title': title})
        old_slugs = [m.findtext('w:meta_value', namespaces=NS) for m in item.findall('w:postmeta', NS)
                     if m.findtext('w:meta_key', namespaces=NS) == '_wp_old_slug']
        if old_slugs: report['editorial'].append({'sourceId': int(ident), 'old_slug_metadata': old_slugs, 'action': 'review; no guessed redirect'})
        raw = item.findtext('c:encoded', default='', namespaces=NS)
        refs = []
        def expand(text, chain=()):
            def replace(m):
                ref = m.group(1); assert ref not in chain and ref in blocks, 'Unresolved reusable block '+ref
                refs.append(ref)
                return expand(blocks[ref].findtext('c:encoded', default='', namespaces=NS), chain+(ref,))
            return re.sub(r'<!--\s*wp:block\s+\{"ref":(\d+)\}\s*/\s*-->', replace, text)
        expanded = expand(raw)
        # Dynamic forms and generated blog queries are documented, not turned into active UI.
        for block in ['jetpack/contact-form', 'query']:
            pattern = r'<!--\s*wp:'+re.escape(block)+r'\b.*?<!--\s*/wp:'+re.escape(block)+r'\s*-->'
            def hold(m):
                comments = re.findall(r'<!--\s*(.*?)\s*-->', m.group(0), re.S)
                report['dynamic_blocks'].append({'sourceId': int(ident), 'block': block, 'source_comments': comments,
                                                'handling': 'inactive form' if block.startswith('jetpack') else 'existing generated archive'})
                return ''
            expanded = re.sub(pattern, hold, expanded, flags=re.S)
        for comment in re.findall(r'<!--\s*wp:([^>]*?)-->', expanded, re.S):
            name = comment.strip().split()[0]
            if name.startswith('jetpack/') or name == 'post-title':
                report['dynamic_blocks'].append({'sourceId': int(ident), 'block': name, 'source_comment': comment.strip(), 'handling': 'inactive or existing page title'})
            match = re.search(r'"backgroundImage":(\{.*?\})', comment)
            if match:
                image = json.loads(match.group(1));report['images'].append({'sourceId': int(ident), 'role': 'background', 'url': image.get('url'), 'alt': None, 'owner': 'user'})
        def social(m):
            a = json.loads(m.group(1))
            return '<li><a href="'+escape(a['url'], quote=True)+'">'+escape(a['service'])+'</a></li>'
        expanded = re.sub(r'<!--\s*wp:social-link\s+(\{.*?\})\s*/\s*-->', social, expanded)
        dom = DOM(); dom.feed(expanded)
        expectations[route] = normalized(plain(dom.root))
        def render(n, depth=0):
            if isinstance(n, str): return literal(n)
            tag, a = n.tag, n.attrs
            if tag in {'script','style','form','input','textarea','select','iframe'}:
                raise AssertionError('Unexpected active element in public body: '+tag)
            if tag == 'img':
                src, alt = a.get('src',''), a.get('alt','')
                report['images'].append({'sourceId': int(ident), 'role': 'inline', 'url': src, 'alt': alt, 'owner': 'user'})
                if ident == '84' and 'dotcompatterns.files.wordpress.com' in src: return ''
                src = existing_images.get(src, src)
                return '\n\n!['+literal(alt)+'](<'+src+'>)\n\n'
            if tag == 'br': return '  \n'
            if tag == 'hr': return '\n\n---\n\n'
            if tag in {'ul','ol'}:
                result=[];start=int(a.get('start','1'))
                for child in n.children:
                    if isinstance(child, Node) and child.tag == 'li':
                        value=''.join(render(c, depth+1) for c in child.children).strip()
                        marker=str(start)+'. ' if tag=='ol' else '- ';start+=1
                        lines=value.splitlines();result.append(marker+lines[0]+''.join('\n  '+line for line in lines[1:]))
                return '\n\n'+'\n'.join(result)+'\n\n'
            value = ''.join(render(c, depth) for c in n.children)
            if tag == 'a' and a.get('href'):
                href=a['href'];u=urlsplit(href)
                if u.hostname in HOSTS:
                    target=url_map.get(u.path)
                    if target:
                        target+=('?' + u.query if u.query else '')+('#'+u.fragment if u.fragment else '')
                        report['link_changes'].append({'sourceId': int(ident), 'from': href, 'to': target});href=target
                    else: report['unresolved_links'].append({'sourceId': int(ident), 'url': href})
                elif href == '#': report['unresolved_links'].append({'sourceId': int(ident), 'url': href, 'reason': 'source placeholder link'})
                return '['+value+'](<'+href+'>)'
            if tag in {'strong','b','em','i'}:
                mark='**' if tag in {'strong','b'} else '*'
                # Keep surrounding source spaces outside emphasis delimiters.
                return value[:len(value)-len(value.lstrip())]+mark+value.strip()+mark+value[len(value.rstrip()):] if value.strip() else value
            if re.fullmatch('h[1-6]',tag): return '\n\n'+'#'*(2 if ident == '84' and tag == 'h6' else max(2,int(tag[1])))+' '+value.strip().replace('\n',' ')+'\n\n'
            if tag == 'blockquote': return '\n\n'+'\n'.join('> '+line for line in value.strip().splitlines())+'\n\n'
            if tag in {'p','div','figure','figcaption','section'}: return '\n\n'+value.strip()+'\n\n'
            return value
        md=re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+','\n\n',render(dom.root)).strip()+'\n'
        # Source URLs remain in Markdown/provenance; the renderer supplies photo placeholders.
        lines=md.split('\n')
        md='\n'.join((line.rstrip() + '\\') if line.strip() and line.endswith('  ') and index+1<len(lines) and lines[index+1].strip() else line.rstrip() for index,line in enumerate(lines))
        path.write_text('---'+front.replace('placeholder: true','placeholder: false')+'---\n\n'+md)
        report['records'].append({'sourceId': int(ident), 'path': route, 'file': str(path.relative_to(ROOT)),
                                  'words': len(expectations[route].split()), 'expanded_blocks': refs})
    (ROOT/'docs/content-migration.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    (ROOT/'tests/migration-text.json').write_text(json.dumps(expectations,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'imported':len(report['records']), 'posts':sum('/posts/' in x['file'] for x in report['records']),
                      'image_references':len(report['images']), 'unique_image_urls':len({x['url'] for x in report['images']}),
                      'normalized_internal_links':len(report['link_changes']), 'unresolved_links':report['unresolved_links']},indent=2))

if __name__ == '__main__': main(sys.argv[1])
