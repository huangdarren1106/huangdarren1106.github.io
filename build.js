// Static site builder: assembles docs/*.html from src/ (no framework).
//   src/partials/*.html   shared layout chunks (head, header, footer, ...)
//   src/pages/<slug>/     page.json (meta) + head.html, main.html, scripts.html
//   src/raw/*.html        pages that are published as-is (own layout)
//   src/redirects.json    old URLs published as redirect stubs
// top-artists.js / top-songs.js still own their two generated pages.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, 'docs');
const SITE = 'https://huangdarren1106.github.io';

const read = (...p) => fs.readFileSync(path.join(SRC, ...p), 'utf8');
const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

function write(file, html) {
  const dest = path.join(OUT, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
}

const partial = (name) => read('partials', `${name}.html`);

function metaBlock(p) {
  return `<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${p.image}">
<meta property="og:url" content="${p.url}">
<meta property="og:site_name" content="Spotify Pie - Exploring Your Spotify Stats in a Fun Way">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<link rel="canonical" href="${p.url}">

  <meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${p.image}">
<meta name="twitter:image:alt" content="${esc(p.title)}">

`;
}

function page(p, dir) {
  const part = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
  return [
    partial('head-start'),
    `  <title>${esc(p.title)}</title>\n  <meta name="description" content="${esc(p.description)}">\n\n  <meta name="robots" content="index, follow">\n\n  `,
    metaBlock(p),
    partial('head-mid'),
    part('head.html'),
    partial('head-end'),
    partial('body-top'),
    part('main.html'),
    partial('footer'),
    part('scripts.html'),
    partial('foot'),
  ].join('');
}

function redirectStub() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Spotify Pie</title>
  <meta http-equiv="refresh" content="0; url=/">
  <link rel="canonical" href="${SITE}/">
  <script>location.replace('/' + location.search + location.hash)</script>
</head>
<body>
  <p><a href="/">Continue to Spotify Pie</a></p>
</body>
</html>
`;
}

function walk(dir, base = '') {
  const found = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      const sub = path.join(dir, e.name);
      if (fs.existsSync(path.join(sub, 'page.json'))) found.push(path.join(base, e.name));
      else found.push(...walk(sub, path.join(base, e.name)));
    }
  }
  return found;
}

const pagesDir = path.join(SRC, 'pages');
const slugs = walk(pagesDir).sort();
for (const slug of slugs) {
  const dir = path.join(pagesDir, slug);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'page.json'), 'utf8'));
  write(`${slug}.html`, page(meta, dir));
}

const rawDir = path.join(SRC, 'raw');
for (const f of fs.readdirSync(rawDir).sort()) write(f, read('raw', f));

for (const slug of JSON.parse(read('redirects.json'))) write(`${slug}.html`, redirectStub());

console.log(`Built ${slugs.length} pages, raw ${fs.readdirSync(rawDir).length}, redirects.`);
