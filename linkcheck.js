// Internal link checker for docs/: node linkcheck.js [dir]
const fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2] || 'docs');
const SITE = 'https://huangdarren1106.github.io';
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(root);
const exists = (u) => { const f = path.join(root, u); return [f, f + '.html', path.join(f, 'index.html')].some((c) => fs.existsSync(c) && fs.statSync(c).isFile()); };
let checked = 0; const bad = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  for (const m of html.matchAll(/(?<![:\w-])(?:href|src)=["']([^"']+)["']/g)) {
    let u = m[1].trim();
    if (u.startsWith(SITE)) u = u.slice(SITE.length) || '/';
    if (!u || /^(#|mailto:|tel:|javascript:|data:|https?:|\/\/)/.test(u) || /[{}$]/.test(u)) continue;
    u = u.split('#')[0].split('?')[0];
    if (!u) continue;
    u = decodeURIComponent(u);
    if (!u.startsWith('/')) u = path.posix.join('/', path.dirname(rel), u);
    checked++;
    if (u === '/' ? !exists('index.html') : !exists(u)) bad.push(`${rel}: ${m[1]}`);
  }
}
console.log(`${files.length} pages, ${checked} internal links checked, ${bad.length} broken`);
[...new Set(bad)].sort().forEach((b) => console.log('  404', b));
process.exit(bad.length ? 1 : 0);
