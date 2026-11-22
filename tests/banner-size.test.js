const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'pages', 'spotify-banner-size');
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'page.json'), 'utf8'));
const main = fs.readFileSync(path.join(dir, 'main.html'), 'utf8');

test('spotify-banner-size title and h1 name 2026 and the header size', () => {
  assert.match(meta.title, /2026/);
  assert.match(meta.title, /2660 x 1140 px/);
  assert.match(main, /<h1[^>]*>Spotify Banner Size 2026: 2660 x 1140 px Header Image Guide<\/h1>/);
  assert.doesNotMatch(meta.title + meta.description + main, /2025/);
});
