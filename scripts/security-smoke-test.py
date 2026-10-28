#!/usr/bin/env python3
"""Offline, dependency-free smoke checks for the TECH FIX static site."""
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.internal_anchors: list[str] = []
        self.scripts: list[str] = []
        self.styles: list[str] = []
        self.inline_handlers: list[str] = []
        self.inline_style_attrs: list[str] = []
        self.inputs: list[dict[str, str | None]] = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values:
            self.ids.append(values['id'] or '')
        if tag == 'a' and (values.get('href') or '').startswith('#'):
            self.internal_anchors.append((values['href'] or '')[1:])
        if tag == 'script':
            self.scripts.append(values.get('src') or 'INLINE')
        if tag == 'link' and values.get('rel') == 'stylesheet':
            self.styles.append(values.get('href') or '')
        for name, _ in attrs:
            if name.lower().startswith('on'):
                self.inline_handlers.append(f'{tag}[{name}]')
        if 'style' in values:
            self.inline_style_attrs.append(f'{tag}[style]')
        if tag in {'input', 'textarea', 'select'}:
            self.inputs.append(values)


def fail(msg: str) -> None:
    errors.append(msg)

required_files = [
    'index.html', 'styles.css', 'app.js', 'icons.js', 'README.md',
    'SECURITY-AUDIT.md', '_headers', 'vercel.json', '.htaccess',
    'nginx-security-headers.conf', 'robots.txt', 'sitemap.xml.template',
    'assets/favicon.svg', 'assets/og-cover.svg',
]
for rel in required_files:
    if not (ROOT / rel).is_file():
        fail(f'Missing required project file: {rel}')

html = (ROOT / 'index.html').read_text(encoding='utf-8')
js = (ROOT / 'app.js').read_text(encoding='utf-8')
icons = (ROOT / 'icons.js').read_text(encoding='utf-8')
css = (ROOT / 'styles.css').read_text(encoding='utf-8')
headers = (ROOT / '_headers').read_text(encoding='utf-8')

parser = SiteParser()
parser.feed(html)
if len(parser.ids) != len(set(parser.ids)):
    duplicates = sorted({x for x in parser.ids if parser.ids.count(x) > 1})
    fail(f'Duplicate id attributes: {duplicates}')
missing_anchors = sorted({anchor for anchor in parser.internal_anchors if anchor and anchor not in set(parser.ids)})
if missing_anchors:
    fail(f'Broken in-page links: {missing_anchors}')
if parser.scripts != ['icons.js', 'app.js']:
    fail(f'Unexpected runtime scripts or script order: {parser.scripts}')
if parser.styles != ['styles.css']:
    fail(f'Unexpected stylesheet references: {parser.styles}')
if parser.inline_handlers:
    fail(f'Inline event handlers forbidden: {parser.inline_handlers}')
if parser.inline_style_attrs:
    fail(f'Inline style attributes forbidden: {parser.inline_style_attrs}')

# Only user-clicked contact/profile anchors may point off-site; runtime scripts and CSS must be local.
if re.search(r'<script[^>]+src="https?://', html, flags=re.I):
    fail('External executable script dependency found.')
if re.search(r'<link[^>]+(?:stylesheet|preconnect)[^>]+href="https?://', html, flags=re.I):
    fail('External stylesheet/preconnect dependency found.')
if re.search(r'@import\s+url\(["\']?https?://', css, flags=re.I):
    fail('External CSS import found.')
if re.search(r'\b(?:innerHTML|outerHTML|document\.write|eval\s*\()', js + icons):
    fail('Unsafe DOM/JavaScript sink found in project JavaScript.')
if re.search(r'\b(?:fetch\s*\(|XMLHttpRequest|WebSocket|serviceWorker)', js + icons):
    fail('Unexpected network/API/service-worker capability found in frontend scripts.')

icon_usage = set(re.findall(r'data-lucide="([^"]+)"', html))
path_block = icons.split('const path = {', 1)[1].split('\n  };', 1)[0]
icon_defs = set()
for match in re.finditer(r"^\s*(?:'([^']+)'|\"([^\"]+)\"|([A-Za-z_$][\w$-]*))\s*:", path_block, re.M):
    icon_defs.add(next(group for group in match.groups() if group))
if icon_usage - icon_defs:
    fail(f'Icons without local definitions: {sorted(icon_usage - icon_defs)}')

if "'unsafe-inline'" in headers:
    fail("CSP must not use 'unsafe-inline'.")
for directive in ["default-src 'self'", "object-src 'none'", "script-src 'self'", "style-src 'self'", "frame-ancestors 'none'", "base-uri 'self'"]:
    if directive not in headers:
        fail(f'Missing CSP directive: {directive}')
try:
    vercel = json.loads((ROOT / 'vercel.json').read_text(encoding='utf-8'))
    if not vercel.get('headers'):
        fail('vercel.json contains no header rules')
except Exception as exc:
    fail(f'vercel.json is not valid JSON: {exc}')

for rel in ['assets/favicon.svg', 'assets/og-cover.svg']:
    try:
        ET.parse(ROOT / rel)
    except Exception as exc:
        fail(f'Invalid SVG/XML in {rel}: {exc}')

if (ROOT / 'sitemap.xml').exists():
    # The domain isn't known; shipping a sitemap under a false domain is worse than a template.
    sitemap = (ROOT / 'sitemap.xml').read_text(encoding='utf-8')
    if 'example.com' in sitemap:
        fail('Active sitemap points to example.com; use sitemap.xml.template until domain is set.')
if not (ROOT / 'sitemap.xml.template').exists():
    fail('Missing sitemap template for production configuration.')

if errors:
    print('TECH FIX smoke test: FAIL')
    for item in errors:
        print(' -', item)
    sys.exit(1)
print('TECH FIX smoke test: PASS')
print(f' - {len(parser.ids)} HTML ids; {len(parser.internal_anchors)} in-page links resolve')
print(f' - {len(icon_usage)} icon names have local path definitions')
print(' - no external runtime scripts, external font stylesheets, inline styles, or inline handlers')
print(' - security-header configuration files and SVG assets are present/valid')
print('Note: this is a static smoke test, not a browser test or penetration test.')
