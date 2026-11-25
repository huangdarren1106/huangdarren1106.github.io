const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
const config = require('../tailwind.config.js');

// Build once into a temp file so the test does not depend on a prior npm run build.
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'tw-'));
const cssFile = path.join(tmp, 'tailwind.css');
execFileSync(path.join(root, 'node_modules/.bin/tailwindcss'), ['-i', 'src/css/tailwind.css', '-o', cssFile, '--minify'], { cwd: root, stdio: 'pipe' });
const css = fs.readFileSync(cssFile, 'utf8');
const esc = (c) => c.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
const hasClass = (c) => css.includes(`.${esc(c)}`);

const templates = [...config.content]
  .flatMap((g) => (g.includes('**') ? fs.readdirSync(path.join(root, 'views')).filter((f) => f.endsWith('.njk')).map((f) => `views/${f}`) : [g.replace('./', '')]));

test('every class in an Alpine :class object literal is in the built CSS (dynamic classes need the safelist)', () => {
  const found = new Set();
  for (const f of templates) {
    for (const m of read(f).matchAll(/:class="\{([^"]*)\}"/g)) {
      for (const k of m[1].matchAll(/'([^']+)'\s*:/g)) k[1].split(/\s+/).forEach((c) => found.add(c));
    }
    for (const m of read(f).matchAll(/:class="\s*[^"]*\?\s*'([^']*)'\s*:\s*'([^']*)'\s*"/g)) {
      [m[1], m[2]].forEach((s) => s.split(/\s+/).filter(Boolean).forEach((c) => found.add(c)));
    }
  }
  assert.ok(found.size >= 3, 'expected to find dynamic classes');
  for (const c of found) assert.ok(hasClass(c), `class ${c} missing from built CSS`);
});

test('every safelisted class exists in the built CSS', () => {
  for (const c of config.safelist) assert.ok(hasClass(c), `safelist class ${c} missing`);
});

test('pages link the built CSS and none loads the Tailwind Play CDN', () => {
  for (const f of ['views/layout.njk', 'src/raw/404.html', 'src/raw/feed.html']) {
    const html = read(f);
    assert.ok(html.includes('href="/tailwind.css"'), `${f} does not link /tailwind.css`);
  }
  for (const dir of ['src', 'views']) {
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
    for (const f of walk(path.join(root, dir))) {
      if (/\.(html|njk)$/.test(f)) assert.ok(!/cdn\.tailwindcss\.com/.test(fs.readFileSync(f, 'utf8')), `${f} uses the Play CDN`);
    }
  }
});

test('d3 and html2canvas tags come before the Alpine tag, all deferred (built receiptify)', () => {
  const html = read('src/partials/alpine.html');
  assert.match(html, /defer/);
  const out = require('child_process').execFileSync('node', ['build.js'], { cwd: root }).toString();
  assert.ok(out.includes('Built'));
  const page = read('docs/receiptify.html');
  const i = (s) => page.indexOf(s);
  for (const lib of ['npm/d3@6', 'html2canvas.min.js']) {
    assert.ok(i(lib) > -1 && i(lib) < i('npm/alpinejs@3'), `${lib} must precede Alpine`);
    assert.match(page.slice(page.lastIndexOf('<script', i(lib)), i(lib)), /defer/);
  }
});
