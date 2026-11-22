const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Rule: outside scripts load async/defer and never block page render.
// Tailwind's Play CDN must run synchronously (it styles the page) so it is the one allowed exception.
// onnetwork.tv's /feed widget is a document.write loader: async would break it, and it is not an ad unit we may touch.
const SYNC_OK = [/^https:\/\/cdn\.tailwindcss\.com/, /^https:\/\/video\.onnetwork\.tv\//];
const roots = ['src', 'views', 'docs'];
const exts = new Set(['.html', '.njk']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (exts.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

// Returns outside <script src> tags that have neither async nor defer (nor type=module, which is deferred).
function blockingScripts(html) {
  const bad = [];
  for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
    const attrs = m[1];
    const src = /\bsrc\s*=\s*["']?(https?:\/\/[^"'\s>]+)/i.exec(attrs);
    if (!src) continue;
    if (/\b(async|defer)\b/i.test(attrs) || /type\s*=\s*["']module["']/i.test(attrs)) continue;
    if (SYNC_OK.some((re) => re.test(src[1]))) continue;
    bad.push(src[1]);
  }
  return bad;
}

test('detector flags a blocking outside script and accepts async/defer', () => {
  assert.deepStrictEqual(blockingScripts('<script src="https://a.example/x.js"></script>'), ['https://a.example/x.js']);
  assert.deepStrictEqual(blockingScripts('<script async src="https://a.example/x.js"></script><script defer src="https://a.example/y.js"></script>'), []);
  assert.deepStrictEqual(blockingScripts('<script src="/local.js"></script>'), []);
});

test('no outside <script src> without async/defer in templates or built pages', () => {
  const root = path.join(__dirname, '..');
  const problems = [];
  for (const r of roots) {
    const dir = path.join(root, r);
    if (!fs.existsSync(dir)) continue;
    for (const f of walk(dir)) {
      for (const s of blockingScripts(fs.readFileSync(f, 'utf8'))) problems.push(`${path.relative(root, f)}: ${s}`);
    }
  }
  assert.deepStrictEqual(problems, []);
});
