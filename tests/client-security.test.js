const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');

test('page scripts do not log the Spotify token', () => {
  for (const page of fs.readdirSync(pagesDir)) {
    const file = path.join(pagesDir, page, 'scripts.html');
    if (!fs.existsSync(file)) continue;
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /console\.log\(\s*this\.token\s*\)/, `${page} logs the access token`);
  }
});

test('playlist-name-generator escapes saved names before innerHTML', () => {
  const source = fs.readFileSync(path.join(pagesDir, 'playlist-name-generator', 'scripts.html'), 'utf8');
  assert.ok(!source.includes('<span>${name}</span>'), 'saved name is inserted raw');
  assert.ok(source.includes(`replace(/[&<>"']/g`), 'saved name is not escaped');
});
