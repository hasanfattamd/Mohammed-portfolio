import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const require = createRequire(import.meta.url);
const { icons } = require('../vendor/lucide.cjs');
const escape = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
function svg(node, extra = {}) {
  const [tag, attrs, children = []] = node;
  return `<${tag} ${Object.entries({ ...attrs, ...extra }).map(([k, v]) => `${k}="${escape(v)}"`).join(' ')}>${children.map(child => svg(child)).join('')}</${tag}>`;
}
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'src'), out, { recursive: true });
let html = await readFile(path.join(root, 'src/index.html'), 'utf8');
let count = 0;
html = html.replace(/<i\b([^>]*data-lucide="([^"]+)"[^>]*)><\/i\s*>/g, (_, attrs, name) => {
  const key = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  if (!icons[key]) throw new Error(`Unknown Lucide icon: ${name}`);
  const cls = /class="([^"]+)"/.exec(attrs)?.[1] || '';
  count++;
  return svg(icons[key], { class: `lucide ${cls}`.trim(), 'aria-hidden': 'true', focusable: 'false' });
});
if (html.includes('data-lucide=')) throw new Error('An icon could not be rendered as static SVG');
const domain = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
let robots = 'User-agent: *\nAllow: /\n';
if (domain) {
  const parsed = new URL(domain);
  if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('SITE_URL must be an HTTP(S) URL');
  const origin = parsed.origin;
  html = html.replace('</head>', `<link rel="canonical" href="${escape(origin)}/">\n<meta property="og:url" content="${escape(origin)}/">\n</head>`);
  html = html.replace('content="/assets/images/mohammed-portrait-with-glasses.png"', `content="${escape(origin)}/assets/images/mohammed-portrait-with-glasses.png"`);
  robots += `Sitemap: ${origin}/sitemap.xml\n`;
  await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(origin)}/</loc></url></urlset>\n`);
}
await writeFile(path.join(out, 'index.html'), html);
await writeFile(path.join(out, 'robots.txt'), robots);
await writeFile(path.join(out, 'favicon.svg'), svg(icons.Code, { width: 32, height: 32, stroke: '#100c08' }));
console.log(`Built portfolio in dist/ with ${count} static icons. No runtime dependencies.`);
